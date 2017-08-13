import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager
} from 'react-native';
import { connect } from 'react-redux';
import { setIndex, lightbox } from './../actions';
import End from './../common/End';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Swiper extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {}
  }

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: 0 });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      }
    });
    this.state = { panResponder, position };
  }

  componentWillMount() {
    this.props.setIndex(0);
    if(this.props.pack[0].title) {
      this.props.lightbox(this.props.pack[0].title, this.props.pack[0].question);
    }
  }

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  forceSwipe(direction) {
    const x = direction === 'right' ? SCREEN_WIDTH * 1.2 : -SCREEN_WIDTH * 1.2;
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, pack } = this.props;
    const item = pack[this.props.index];

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    this.state.position.setValue({ x: 0, y: 0 });
    this.props.setIndex(this.props.index + 1 );

    if (this.props.index < this.props.pack.length) {
      this.props.lightbox(this.props.pack[this.props.index].title,this.props.pack[this.props.index].question);
    }
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-20deg', '0deg', '20deg']
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderCards() {

    if (this.props.condition) {
      return (
        <End />
      );
    }

    return this.props.pack.map((item, i) => {
      if (i < this.props.index || i > this.props.index + 2) { return null; }

      if (i === this.props.index) {
        return (
          <Animated.View
            key={item.id}
            style={[this.getCardStyle(), styles.cardStyle, { zIndex: 99 }]}
            { ...this.state.panResponder.panHandlers }
          >
              {this.props.renderQuiz(item)}
          </Animated.View>
        );
      }

      return (
          <Animated.View
            key={item.id}
            style={[styles.cardStyle, { top: 7 * (i - this.props.index), zIndex: 5 }]}
          >
            {this.props.renderQuiz(item)}
          </Animated.View>
      );
    }).reverse();
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH
  }
};

const mapStateToProps = (state) => {
  const { mode, wrong, index, answer, time } = state.quiz;

  return { mode, wrong, index, answer, time };
}

export default connect(mapStateToProps,{setIndex,lightbox})(Swiper);