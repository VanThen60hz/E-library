
// Pagination
// lastPage: true
// pageNo: 0
// pageSize: 10
// totalElements: 9
// totalPage: 1


var apiUrl = "http://localhost:8080/api/book";
var productData = [];
let itemsPerpage = 4;
let currentPage = 1;
let link = document.getElementsByClassName("link");

async function productTable() {
  const data = await fetch(apiUrl);
  const res = await data.json();
  productData = res.content;
  pageData = res;
}

async function dataTable() {
  await productTable();
  console.log(pageData);
  // console.log(data)
  console.log(currentPage);
  // Pagination
  pageData.totalPage = Math.ceil(pageData.totalElements / itemsPerpage);

  if (currentPage > pageData.totalPage) {
    currentPage = pageData.totalPage;
  } else if (currentPage < 1) {
    currentPage = 1;
  }

  const btnNext = document.querySelector('#btn-next button');
  const btnPrev = document.querySelector('#btn-prev button');

  if (currentPage === pageData.totalPage) {
    btnNext.classList.add('inactive');
  } else if (currentPage === 1) {
    btnPrev.classList.add('inactive');
  }



  const indexOfLastPage = currentPage * itemsPerpage;
  const indexOfFirstPage = indexOfLastPage - itemsPerpage;
  const currentItems = productData.slice(indexOfFirstPage, indexOfLastPage);

  document.getElementById("titleProduct").innerHTML = currentItems.map(products =>
    `
      <div class="col-md-3">
        <div class="book-item hover:card">
          <div class="book-item-img">
            <a href="#">
              <img class="book-img" srcset="${products.image}"
                alt="Cây Cam Ngọt Của Tôi" loading="eager" class="styles__StyledImg-sc-p9s3t3-0 hbqSye loaded">
            </a>
          </div>
          <div class="down-content">
            <a href="#">
              <h4>${products.title}</h4>
            </a>
            <p class="book-auther">
              ${products.authorId}
            </p>
            <div class="star">
              <img src="./assets/images/ratings/rating-35.png" alt="">
              <span>Reviews (24)</span>
            </div>
          </div>
        </div>
      </div>  
    `
  ).join("");

}
dataTable();
renderListPage();

async function renderListPage() {
  productHTML = '';
  const listPage = document.getElementById("listPage");

  productHTML =
    `
    <li id="btn-prev">
      <button>
        <a href="#" (click)="yourClickEvent();">
          <i class="fa-solid fa-chevron-left"></i>
        </a>
      </button>
    </li>
    <li><a href="#" class="link active">1</a></li>
    <li><a href="#" class="link">2</a></li>
    <li><a href="#" class="link">3</a></li>
    <li><a href="" class="inactive">...</a></li>
    <li id="btn-next">
      <button href="">
        <a href="#" class="" (click)="$event.preventDefault()">
          <i class="fa-solid fa-chevron-right"></i>
        </a>
      </button>
    </li>
  `

  listPage.innerHTML = productHTML;
}

function changePage() {
  const currentPages = document.querySelectorAll('.number-page > li > a')
  for (let i = 0; i < currentPages.length; i++) {
    currentPages[i].addEventListener('click', () => {
      let value = i + 1;
      currentPage = value;
      document.querySelector('.number-page li').classList.remove('active')
      dataTable();
    })
  }
}
changePage();

document.querySelector("#btn-prev").addEventListener("click", () => {
  currentPage--;
  document.querySelector('#btn-next button').classList.remove('inactive');
  dataTable();
});
document.querySelector("#btn-next").addEventListener("click", () => {
  currentPage++;
  document.querySelector('#btn-prev button').classList.remove('inactive');
  dataTable();
});








