// Designed by: Ruari Shephard

// Inspired by:  https://www.behance.net/gallery/56632749/Bon?tracking_source=search_projects_appreciations

const items = [
  {
    img: "../img/home/slider/thum-1.png",
    category: "Album Promotion Behind The Scenes",
    title: "고장난 타임머신",
    price: "메카니즘 (조혜련&페퍼톤스 (PEPPERTONES))",
    bgColor: "#81d9eb",
  },
  {
    img: "../img/home/slider/thum-2.png",
    category: "MV Behind The Scenes",
    title: "고장난 타임머신",
    price: "메카니즘 (조혜련&페퍼톤스 (PEPPERTONES))",
    bgColor: "#81d9eb",
  },
  {
    img: "../img/home/slider/thum-3.png",
    category: "2025 정승환 팬콘서트 [University of Seung Hwan]",
    title: "이 노래가",
    price: "정승환",
    bgColor: "#81d9eb",
  },
  {
    img: "../img/home/slider/thum-4.png",
    category: "COVER SONG",
    title: "Strawberry Jam",
    price: "윤석철트리오 YUNSEOKCHEOL TRIO",
    bgColor: "#81d9eb",
  },
  {
    img: "../img/home/slider/thum-5.png",
    category: "안테나 라디오📡EP.08",
    title: "Not Out",
    price: "Dragon Pony (드래곤포니)",
    bgColor: "#81d9eb",
  },
  {
    img: "../img/home/slider/thum-6.png",
    category: "2024 윤석철트리오 단독공연 [나의 여름은 아직 안 끝났어]",
    title: "루틴 없는 게 루틴’+'말 없는 사람’+'Samba de Seoul’",
    price: "윤석철트리오 YUNSEOKCHEOL TRIO",
    bgColor: "#81d9eb",
  },
];

const timeLine = gsap.timeline();

class Slider {
  constructor(items) {
    this.active = 0;
    this.items = items;
    document
      .querySelectorAll(".slider__btn-switch[data-type]")
      .forEach((btn) => {
        btn.onclick = () => this.handleClick(btn.dataset.type);
      });
  }

  renderItem() {
    const { img, category, title, price } = this.items[this.active];

    const sliderContent = `
      <img class="slider__img" src="${img}" alt="${title}" />
      <div class="slider__context flex-column">
        <h3 class="slider__category">${category}</h3>
        <strong class="slider__title">${title}</strong>
        <small class="slider__price">${price}</small>
      </div>
    `;
    const sliderIndex = `
      <span>${
        this.active < 10 ? "0" + (this.active + 1) : this.active + 1
      }</span>
      <span>${
        this.items.length < 10 ? "0" + this.items.length : this.items.length
      }</span>
    `;

    document.querySelector(".slider__content").innerHTML = sliderContent;
    document.querySelector(".slider__index").innerHTML = sliderIndex;
  }

  basicAimation(dir, delay) {
    timeLine.to(".slider", {
      delay,
      duration: 0.2,
      backgroundColor: `${items[this.active].bgColor}`,
    });
    timeLine.fromTo(
      ".slider__img",
      {
        x: 150 * dir,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      }
    );
    timeLine.fromTo(
      ".slider__context *",
      {
        x: 50 * dir,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
      },
      "<"
    );
  }

  handleClick(type) {
    const dir = type === "next" ? 1 : -1;
    timeLine.to(".slider__img", {
      x: -250 * dir,
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",

      onComplete: () => {
        if (type === "next") {
          this.active = this.active === items.length - 1 ? 0 : this.active + 1;
        } else {
          this.active = this.active <= 0 ? items.length - 1 : this.active - 1;
        }

        this.renderItem();
        this.basicAimation(dir);
      },
    });
    timeLine.to(
      " .slider__context *",
      {
        x: -100 * dir,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.inOut",
      },
      "<"
    );
  }
}

const slider = new Slider(items);
slider.renderItem();
slider.basicAimation(1, 1);