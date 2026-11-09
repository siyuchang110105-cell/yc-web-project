let userName = "";
// ===== 新增：已瀏覽收藏夾 全域陣列 =====
let browseCollection = [];

// 统一切页函数：靠ID找页面
function showPage(pageId) {
  console.log("【切頁請求】目標ID：", pageId);
  // 先檢查目標頁面是否存在，避免報錯中斷程式
  const targetPage = document.getElementById(pageId);
  if (!targetPage) {
    console.error("【錯誤】找不到 id = " + pageId + " 的頁面！請檢查HTML");
    return;
  }

  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
  })
  targetPage.classList.add('active');
}

// DOM全部載入完成後才綁定所有事件，所有綁定都放這裡面！
window.onload = function() {
  console.log("✅ DOM載入完畢，開始綁定按鈕事件");

  // ========== 頁1 輸入名字，前往頁2 ==========
  document.getElementById('goPage2Btn').addEventListener('click', function() {
    const inputVal = document.getElementById('userNameInput').value.trim();
    userName = inputVal || "访客";
    document.getElementById('userNameReplace').innerText = userName;
    console.log("【點擊】確認名字，前往 page2");
    showPage('page2');
  })

  // 頁1：跳過，直接到page4
  document.getElementById('skipToPage4_1').addEventListener('click', function(){
    console.log("【點擊】頁1跳過按鈕，前往 page4");
    showPage('page4');
  });

  // ========== 頁2 ==========
  document.getElementById('goPage3Btn').addEventListener('click', function() {
    console.log("【點擊】頁2繼續，前往 page3");
    showPage('page3');
  })
  // 頁2 返回page1
  document.getElementById('backToPage1_2').addEventListener('click', function(){
    console.log("【點擊】頁2返回，前往 page1");
    showPage('page1');
  });
  // 頁2 跳過到page4
  document.getElementById('skipToPage4_2').addEventListener('click', function(){
    console.log("【點擊】頁2跳過按鈕，前往 page4");
    showPage('page4');
  });

  // ========== 頁3 ==========
  document.getElementById('btnToPage4').addEventListener('click', function() {
    console.log("【點擊】頁3繼續觀賞，前往 page4");
    showPage('page4');
  })
  // 頁3 返回page2
  document.getElementById('backToPage2_3').addEventListener('click', function(){
    console.log("【點擊】頁3返回，前往 page2");
    showPage('page2');
  });
  // 頁3 跳過到page4
  document.getElementById('skipToPage4_3').addEventListener('click', function(){
    console.log("【點擊】頁3跳過按鈕，前往 page4");
    showPage('page4');
  });
 
  // ========== page4 所有可點擊畫框/標題 .art-link-click ==========
document.querySelectorAll('.art-link-click').forEach(el => {
  el.addEventListener('click', () => {
    const target = el.dataset.target;
    console.log("【點擊畫框/標題】目標：", target);
    showPage(target);
  })
})

// ========== 詳情頁返回按鈕 .back-btn ==========
document.querySelectorAll('.back-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target;
    console.log("【點擊返回按鈕】目標：", target);
    showPage(target);
  })
})

// ========== 收藏按鈕：加入已瀏覽收藏夾 ==========
document.querySelectorAll('.collect-btn').forEach(btn => {
  btn.addEventListener('click', function(){
    const artName = this.dataset.artname;
    const artYear = Number(this.dataset.year);
    const alreadyExist = browseCollection.some(item => item.name === artName);
    if(alreadyExist){
      alert("這幅畫已經在你的瀏覽收藏夾裡了！");
      return;
    }
    browseCollection.push({
      name: artName,
      year: artYear
    });
    console.log("✅ 已加入收藏：", browseCollection);
    alert(`✅ ${artName}（${artYear}年）已加入已瀏覽收藏夾`);
  })
})

// ========== page4 右下角：進入總結頁 page9 ==========
const goPage9Btn = document.getElementById('goPage9Btn');
if (goPage9Btn) {
  goPage9Btn.addEventListener('click', function () {
    console.log("【點擊】瀏覽完畢，前往 page9");
    showPage('page9');
  });
}

// ========== page9 生成總結文案（只保留這一份，帶防錯判斷） ==========
const showSummaryBtn = document.getElementById('showSummaryBtn');
if (showSummaryBtn) {
  showSummaryBtn.addEventListener('click', function () {
    const total = browseCollection.length;
    if (total === 0) {
      alert("你還沒有收藏任何畫作！");
      return;
    }
    const yearList = browseCollection.map(item => item.year);
    const minYear = Math.min(...yearList);
    const maxYear = Math.max(...yearList);
    const summaryText =
      `在今天的瀏覽中，你了解了${total}幅畫作，橫跨了${minYear}年至${maxYear}年之內的美術作品`;

    const textNode = document.getElementById('summaryText');
    if (textNode) textNode.innerText = summaryText;
    console.log("總結文案：", summaryText);
  });
}
 }