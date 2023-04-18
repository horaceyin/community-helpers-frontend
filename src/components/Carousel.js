import { Dimensions, Image, FlatList } from "react-native";
import { React, useState, useRef, useCallback, useEffect } from "react";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Slide({ data }) {
  console.log(data);
  return (
    <Image
      source={{ uri: data }}
      style={{
        width: Dimensions.get("window").width - 50,
        height: 300,
        borderRadius: 15,
      }}
    />
  );
}

export default function Carousel(props) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;
  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);

    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      []
    ),
  };

  useEffect(() => {
    props.setCarouselIndex(index);
  }, [index]);

  return (
    <FlatList
      data={props.images}
      style={{ flex: 1, paddingBottom: 20 }}
      renderItem={({ item }) => {
        return <Slide data={item} />;
      }}
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      onScroll={onScroll}
      {...flatListOptimizationProps}
    />
  );
}
