function includeHTML(){

    var z, i, elmnt, file, xhttp;
    // 변수선언

    z = document.getElementsByTagName("*");
    // 모든 영역(*)에서 태그네임을 얻음

    for(i=0; i < z.length; i++){
    // z의 length보다 작을 때까지 i는 개별증가해라 : i는 가지고 있는 만큼 반복

        elmnt = z[i];
        // 변수 elmnt에 z의 개별을 대입

        file = elmnt.getAttribute("w3-include-html");
        // 모든 요소를 순회하면서 w3-include-html 속성이 있는지 검사

        if (file){
        // 파일에 속성이 존재한다면
        // if (!=null) << 이건 "존재한다면"이라는 의미(null을 부정하는 것이므로)
            xhttp = new XMLHttpRequest();
            // 속성이 있다면 Ajax 요청을 준비한다
            xhttp.onreadystatechange = function(){
                if(this.readyState == 4){
                // 요청이 완료되면
                    if(this.status == 200){ //성공
                        elmnt.innerHTML = this.responseText;
                    }
                    if(this.status == 404){ //실패
                        elmnt.innerHTML = "Page not found"
                    }
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML(); //재귀호출(자기 스스로를 호출함)
                }
            }
            xhttp.open("GET", file, true); //비동기 (true) 방식으로 요청을 보냄
            xhttp.send();
            return; //리턴으로 함수 종료하여 현재 요소만 처리
        }
    }
}


//스케줄 수정본
document.addEventListener('DOMContentLoaded', function () {
  const categoryMap = {
    '전체보기': ['radio_sc', 'music_sc', 'media_sc', 'movie_sc'],
    '라디오': ['radio_sc'],
    '음악': ['music_sc'],
    '방송': ['media_sc'],
    '영화': ['movie_sc'],
  };

  // 모든 드롭다운 항목에 클릭 이벤트 연결
  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault(); // a 태그 기본 동작 막기

      const selected = this.textContent.trim(); // 선택된 텍스트
      const showClasses = categoryMap[selected] || []; // 보여줄 클래스 목록

      // 모든 day-text 숨기기
      document.querySelectorAll('.day-text').forEach(el => {
        el.style.display = 'none';
      });

      // .ss 클래스를 숨기기 전 초기화
      document.querySelectorAll('.ss').forEach(el => {
        el.style.display = 'none'; // .ss를 숨긴다
      });

      // 선택된 카테고리만 보여주기
      if (showClasses.length > 0) {
        showClasses.forEach(cls => {
          document.querySelectorAll(`.${cls}`).forEach(el => {
            el.style.display = 'block';

            // 추가, 해당 요소가 .ss <td> 안에 있으면 <td>도 보여주기 -----------------------------
            const parentTd = el.closest('.ss');
            if (parentTd) {
              parentTd.style.display = 'table-cell'; // 추가 끝
            }
          });
        });
      }

      // '전체보기' 또는 '라디오'일 경우 .ss 클래스 보이게 하기
      if (selected === '전체보기' || selected === '라디오') {
        document.querySelectorAll('.ss').forEach(el => {
          // el.style.display = 'block'; (기존 내용)
          // 추가 ---------------------------------------------------------------------------
          td.style.display = 'table-cell';
          const radio = td.querySelector('radio_sc');
          if (radio) radio.style.display = 'block'; // 추가 끝
        });
      }
    });
  });
});