import { ref, onMounted, onUnmounted } from "vue";

interface Options {
  height?: number;
  tapSelector?: string; // 多个用逗号隔开
  yScrollSelector?: string; // 纵向滚动条，多个用逗号隔开
  xScrollSelector?: string; // 横向滚动条，多个用逗号隔开
}

export default function useVisualViewport(options: Options = {}) {
  const height = ref(options?.height || 0)
  let visualViewport:any = window.visualViewport;
  // const [height, setHeight] = useState(options.height || 0);

  onMounted(() => {
    let pendingUpdate = false;

    function viewportHandler(event: Event) {
      if (pendingUpdate) return;
      pendingUpdate = true;

      requestAnimationFrame(() => {
        pendingUpdate = false;

        height.value = visualViewport.offsetTop
        // setTimeout(() => {
        //   alert('height.value' + height.value)
        // }, 1000)
        // setHeight();
      });
    }

    visualViewport.addEventListener("scroll", viewportHandler);
    visualViewport.addEventListener("resize", viewportHandler);

    var startY = 0;
    var minScrollTop = -Infinity;

    function handleTouchstart(e: TouchEvent) {
      // console.log('handleTouchstart', e)
      const tap = options.tapSelector && Array.from(document.querySelectorAll(options.tapSelector));
      const hasTap = tap && tap.some((item) => item.contains(e.target as any));
      const yScroll = options.yScrollSelector && Array.from(
        document.querySelectorAll(options.yScrollSelector)
      );
      const yScrollContainer = yScroll && yScroll.find((item) => item.contains(e.target as any));
      const xScroll = options.xScrollSelector && Array.from(
        document.querySelectorAll(options.xScrollSelector)
      )
      const xScrollContainer = xScroll && xScroll.find((item) => item.contains(e.target as any));

      if (hasTap || xScrollContainer) {
        // 不做任何事情
      } else if (yScrollContainer) {
        startY = e.changedTouches[0].clientY;
        minScrollTop =
          yScrollContainer.clientHeight - yScrollContainer.scrollHeight + 1;
        // console.log('startY', startY, minScrollTop)
      } else {
        e.preventDefault();
      }
    }

    function handleTouchmove(e: TouchEvent) {
      // console.log('handleTouchmove', e)
      const yScroll = options.yScrollSelector && Array.from(
        document.querySelectorAll(options.yScrollSelector)
      );
      const yScrollContainer = yScroll && yScroll.find((item) => item.contains(e.target as any));
      const clientY = e.changedTouches[0].clientY;
      const end = clientY - startY;
      const xScroll = options.xScrollSelector && Array.from(
        document.querySelectorAll(options.xScrollSelector)
      )
      const xScrollContainer = xScroll && xScroll.find((item) => item.contains(e.target as any));

      e.stopPropagation();

      if (xScrollContainer) {
        // 不做任何事情
      } else if (yScrollContainer) {
        var scrollTop = yScrollContainer.scrollTop;
        var clientHeight = yScrollContainer.clientHeight;
        var scrollHeight = yScrollContainer.scrollHeight;
        const isTextarea = yScrollContainer.tagName === "TEXTAREA";

        // 下拉
        if (end > 0) {
          // 到顶了
          if (isTextarea ? scrollTop <= 0 : scrollTop < minScrollTop) {
            // console.log('到顶了')
            e.preventDefault();
          }
        } else if (end < 0) {
          // 到底了
          if (
            isTextarea ? scrollTop >= Math.abs(minScrollTop) : scrollTop === 0
          ) {
            // console.log('到底了')
            e.preventDefault();
          }
        }
      } else {
        e.preventDefault();
      }
    }

    window.addEventListener("touchstart", handleTouchstart, { passive: false });
    window.addEventListener("touchmove", handleTouchmove, { passive: false });

    onUnmounted(() => {
      visualViewport.removeEventListener("scroll", viewportHandler);
      visualViewport.removeEventListener("resize", viewportHandler);

      window.removeEventListener("touchstart", handleTouchstart);
      window.removeEventListener("touchmove", handleTouchmove);
    });
  });

  return {
    height
  };
}
