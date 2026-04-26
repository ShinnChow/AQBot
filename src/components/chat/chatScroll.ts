export const CHAT_SCROLL_IS_REVERSED = false;
export const CHAT_AUTO_SCROLL_BOTTOM_THRESHOLD = 8;
export const CHAT_SCROLL_TO_BOTTOM_VISIBILITY_THRESHOLD = 160;

export function getDistanceToHistoryTop(
  scrollHeight: number,
  scrollTop: number,
  clientHeight: number,
  isReversed: boolean,
) {
  return isReversed ? scrollHeight + scrollTop - clientHeight : scrollTop;
}

export function getScrollTopAfterPrepend(
  previousScrollTop: number,
  previousScrollHeight: number,
  nextScrollHeight: number,
  isReversed: boolean,
) {
  const heightDelta = Math.max(0, nextScrollHeight - previousScrollHeight);
  return isReversed
    ? previousScrollTop - heightDelta
    : previousScrollTop + heightDelta;
}

export type ScrollLayoutMetrics = {
  scrollHeight: number;
  clientHeight: number;
};

export function hasScrollLayoutMetricsChanged(
  previous: ScrollLayoutMetrics,
  next: ScrollLayoutMetrics,
  threshold = 1,
) {
  return Math.abs(next.scrollHeight - previous.scrollHeight) > threshold
    || Math.abs(next.clientHeight - previous.clientHeight) > threshold;
}

export function shouldStickToBottomOnLayoutChange(
  previous: ScrollLayoutMetrics,
  next: ScrollLayoutMetrics,
  wasStickingToBottom: boolean,
  hadRecentUserScrollIntent = false,
  threshold = 1,
) {
  return wasStickingToBottom
    && !hadRecentUserScrollIntent
    && hasScrollLayoutMetricsChanged(previous, next, threshold);
}

export function shouldIgnoreScrollDepartureFromBottom(
  keepAutoScroll: boolean,
  wasStickingToBottom: boolean,
  hadRecentUserScrollIntent: boolean,
  hasLayoutChanged: boolean,
) {
  return !keepAutoScroll && wasStickingToBottom && !hadRecentUserScrollIntent && hasLayoutChanged;
}

export function shouldShowScrollToBottom(
  scrollHeight: number,
  scrollTop: number,
  clientHeight: number,
  isReversed: boolean,
  threshold = CHAT_SCROLL_TO_BOTTOM_VISIBILITY_THRESHOLD,
) {
  if (isReversed) {
    return scrollTop < -threshold;
  }
  return scrollHeight - clientHeight - scrollTop > threshold;
}

export function shouldKeepAutoScroll(
  scrollHeight: number,
  scrollTop: number,
  clientHeight: number,
  isReversed: boolean,
  threshold = CHAT_AUTO_SCROLL_BOTTOM_THRESHOLD,
) {
  if (isReversed) {
    return scrollTop >= -threshold;
  }
  return scrollHeight - clientHeight - scrollTop <= threshold;
}
