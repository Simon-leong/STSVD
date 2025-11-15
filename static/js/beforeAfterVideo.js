function initBeforeAfterSlider(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const beforeVideo = container.querySelector('.before-video');
  const handle = container.querySelector('.slider-handle');

  let isDragging = false;

  function updateClip(x) {
    const rect = container.getBoundingClientRect();
    let offsetX = x - rect.left;
    offsetX = Math.max(0, Math.min(offsetX, rect.width));

    // clip-path inset 参数格式: inset(top right bottom left)
    // 我们控制右侧 inset = rect.width - offsetX
    // 左侧固定为0，top和bottom固定为0
    const rightInset = rect.width - offsetX;
    beforeVideo.style.clipPath = `inset(0px ${rightInset}px 0px 0px)`;

    // 移动滑块
    handle.style.left = `${offsetX}px`;
  }

  function onDragStart(e) {
    isDragging = true;
    updateClip(e.clientX || e.touches[0].clientX);
  }

  function onDragMove(e) {
    if (!isDragging) return;
    updateClip(e.clientX || e.touches[0].clientX);
  }

  function onDragEnd() {
    isDragging = false;
  }

  handle.addEventListener('mousedown', onDragStart);
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('mouseup', onDragEnd);

  handle.addEventListener('touchstart', onDragStart);
  window.addEventListener('touchmove', onDragMove);
  window.addEventListener('touchend', onDragEnd);

  // 初始化位置在中间
  updateClip(container.getBoundingClientRect().left + container.offsetWidth / 2);
}
