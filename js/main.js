/**
 * 검색창 제어
 */
// 검색창 요소(.search) 찾기.
const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');
// document, 즉 HTML에서 안찾고 효율적으로 작성하기 위해 searchEl이라는 변수를 둬 그 안 input 태그 선택자로만 찾게 작성
searchEl.addEventListener('click', function () { // 검색창 요소를 클릭하면 실행.
  searchInputEl.focus();
});
// 즉, 애드리벤트리스너로 1. search 요소 클릭 및 포커스 2. input 요소도 같이 포커스됨 이라는 동적 과정을 만듬

// 검색창 요소 내부 실제 input 요소에 포커스되면 실행.
searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});
// 1. 포커스 2. focused라는 클래스를 search 클래스에 붙임 3. input 요소에 통합검색을 붙힘

// 검색창 요소 내부 실제 input 요소에서 포커스가 해제(블러)되면 실행.
searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});
// 1. 블러 2. 지움 3. 없앰


/**
 * 페이지 스크롤에 따른 요소 제어
 */
// 페이지 스크롤에 영향을 받는 요소들을 검색!
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top')
// window: 윈도우 객체, 윈도우 창을 뜻함, 우리가 보는 화면 자체
window.addEventListener('scroll', _.throttle(function () { // lodash 라이브러리를 통해 등록 후 여기서 사용
  console.log(window.scrollY);
  if (window.scrollY > 500) { // 스크롤 될 때마다 윈도우의 객체 부분의 속성 Y의 값이(스크롤의 위치 몇픽셀) 갱신되는 걸 알려줌
    // 배지 숨기기
    // gsap.to(요소, 지속시간, 옵션-객체데이터);
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
// opacity: 0으로 처리해 투명하게 하면서 display: 'none'을 사용해 클릭조차 안되게 만듬
// display: `none`만 사용하면 중간값이 존재하지 않기에 자연스러운 전환 효과 사용 불가능 그래서 opacity랑 같이 사용함
// JS를 입력 중 숫자는 그냥 입력해도 되지만 js에선 변수값이 문자면 따옴표 필수!
    });
    // 상단으로 스크롤 버튼 보이기!
    gsap.to(toTopEl, .2, {
      x: 0
    });
  } else {
    // 배지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    // 상단으로 스크롤 버튼 숨기기!
    gsap.to(toTopEl, .2, {
      x: 100
    });
  }
}, 300)); // 300 ms라는 뜻, 스크롤을 굴려도 0.3초마다 실행되게!
// _.throttle(함수() {}, 시간)
// 상단으로 스크롤 버튼을 클릭하면,
toTopEl.addEventListener('click', function () {
  // 페이지 위치를 최상단으로 부드럽게(0.7초 동안) 이동.
  gsap.to(window, .7, {
    scrollTo: 0 // 회면의 위치를 0으로
  })
});


/**
 * 순서대로 나타나는 기능
 */
// 나타날 요소들(.fade-in) 찾기.
const fadeEls = document.querySelectorAll('.visual .fade-in');
// 나타날 요소들을 하나씩 반복해서 처리!
fadeEls.forEach(function (fadeEl, index) { // 반복 사용, 순서 정의
  // 각 요소들을 순서대로(delay) 보여지게 함!
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, // 0.7, 1.4, 2.1, 2.7 ... 반복
    opacity: 1
  });
});


/**
 * 슬라이드 요소 관리
 */
// 생성자 new를 선언해 Swiper('선택자', {옵션}); Swiper라는 기능을 추가한다.
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical', // 수직 슬라이드
  autoplay: true, // 자동 재생 여부: 불린 데이터로 결정
  loop: true // 반복 재생 여부: 불린 데이터로 결정
});
new Swiper('.promotion .swiper-container', {
  // direction: 'horizontal', // 수평 슬라이드
  autoplay: { // 자동 재생 여부
    delay: 5000 // 5초마다 슬라이드 바뀜
  },
  loop: true, // 반복 재생 여부
  slidesPerView: 3, // 한 번에 3개 보여줌!
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  pagination: { // 페이지 번호 사용 여부
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: { // 슬라이드 이전/다음 버튼 사용 여부
    prevEl: '.promotion .swiper-prev', // 이전 버튼 선택자
    nextEl: '.promotion .swiper-next' // 다음 버튼 선택자
  }
});
new Swiper('.awards .swiper-container', {
  // direction: 'horizontal', // 수평 슬라이드
  autoplay: true, // 자동 재생 여부
  loop: true, // 반복 재생 여부
  spaceBetween: 30, // 슬라이드 사이 여백
  slidesPerView: 5, // 한 번에 보여줄 슬라이드 개수
  // slidesPerGroup: 5, // 한 번에 슬라이드 할 개수(전체 개수로 나뉘어야 함)
  navigation: { // 슬라이드 이전/다음 버튼 사용 여부
    prevEl: '.awards .swiper-prev', // 이전 버튼 선택자
    nextEl: '.awards .swiper-next' // 다음 버튼 선택자
  }
});


/**
 * Promotion 슬라이드 토글 기능, CSS에 활용할 클래스 만들기
 */
// 슬라이드 영역 요소 검색 및 변수 할당
const promotionEl = document.querySelector('.promotion');
// 슬라이드 영역를 토글하는 버튼 검색 및 변수에 할당
const promotionToggleBtn = document.querySelector('.toggle-promotion');
// 슬라이드 영역 숨김 여부 기본값을 false로 할당
let isHidePromotion = false;
// 토글 버튼을 클릭하면,
promotionToggleBtn.addEventListener('click', function () { // 이벤트 핸들러
  // 슬라이드 영역 숨김 여부를 느낌표를 써 반댓값으로 할당!
  isHidePromotion = !isHidePromotion
  // 요소를 숨겨야 하면,
  if (isHidePromotion) {
    promotionEl.classList.add('hide')
  // 요소가 보여야 하면,
  } else {
    promotionEl.classList.remove('hide')
  }
});


/**
 * 부유하는 요소 관리
 */
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 '문자 데이터'를,
  // `parseFloat()`을 통해 소수점을 가지는 '숫자 데이터'로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
function floatingObject(selector, delay, size) { // 딜레이, 사이즈 작성은 명확히 하기 위함
  // gsap.to(요소, 시간, {옵션});
  gsap.to(
    selector, // 요소: 선택자
    random(1.5, 2.5), // 애니메이션 동작 시간
    {
      delay: random(0, delay), // 시작 지연 시간을 설정, 단위: s
      y: size, // `transform: translateY(수치);`와 같음. 수직으로 얼마나 움직일지 설정
      repeat: -1, // `-1`은 무한 반복
      yoyo: true, // 한번 재생된 애니메이션을 다시 뒤로 재생
      ease: Power1.easeInOut // Easing In Out 함수 적용
    }
  )
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20); // 실행
// 숫자들은 위에 각각 delay, size로 들어간다!


/**
 * 요소가 화면에 보여짐 여부에 따른 요소 관리
 */
// 관리할 요소들 검색!
const spyEls = document.querySelectorAll('section.scroll-spy');
// 요소들 반복 처리!
spyEls.forEach(function (spyEl) {
  new ScrollMagic // 여기 생성자는 .XXXX = 메소드로 제어 중, 메소드가 길어지니 줄바꿈
    .Scene({ // Scene(특정한 요소를 감시할 장면)을 추가
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8 // 실행될 애니를 지금 보는 화면 0.8, 80% 지점에서 실행!
    })
    .setClassToggle(spyEl, 'show') // 토글: 넣다뺐다, 요소가 화면에 보이면 show 클래스 추가
    .addTo(new ScrollMagic.Controller()); // 컨트롤러에 장면을 할당(필수!)
});


/**
 * 올해가 몇 년도인지 계산
 */
const thisYear = document.querySelector('.this-year')
thisYear.textContent = new Date().getFullYear() 
// Date객체를 생성자 함수로 날짜 계산, getFullYear()라는 메소드는 현재 날짜를 숫자 데이터로 반환