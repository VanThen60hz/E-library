let pageNo = 0;
var productData = [];
let itemsPerpage = 4;
let totalPage = 0;
let currentPage = 1;
let link = document.getElementsByClassName("link");
let pageButtons = [];
let productId = 0;
let bookId = 0;
let productList = ""


async function productTable() {
  var apiUrl = `http://localhost:8080/api/book?pageSize=4&pageNo=${pageNo}`;

  const data = await fetch(apiUrl);
  const res = await data.json();
  productData = res.content;
  totalPage = res.totalPage;
}

async function dataTable() {
  productList = '';
  await productTable();

  if (pageNo === totalPage - 1) {
    pageNo = totalPage - 1;
  } else if (pageNo < 1) {
    pageNo = 0;
  }

  const btnNext = document.querySelector('#btn-next button');
  const btnPrev = document.querySelector('#btn-prev button');

  if (btnNext && btnPrev) {
    if (pageNo === totalPage - 1) {
      btnNext.classList.add('inactive');
    } else if (pageNo === 0) {
      btnPrev.classList.add('inactive');
    }
  }

  let titleProduct = document.getElementById("titleProduct");

  // Pagination
  productData.forEach(products => {
    productList +=
      `
      <div class="col-md-3">
        <div class="book-item hover:card" id="${products.id}">
          <div class="book-item-img">
            <a href="./pages/book-detail.html?bookId=${products.id}">
              <img class="book-img" srcset="${products.image}"
                alt="Cây Cam Ngọt Của Tôi" loading="eager" class="styles__StyledImg-sc-p9s3t3-0 hbqSye loaded">
            </a>
          </div>
          <div class="down-content">
            <a href="./pages/book-detail.html">
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
  })

  titleProduct.innerHTML = productList;

  renderListPage();
}




async function renderListPage() {
  let productHTML = '';
  await productTable();

  const listPage = document.getElementById("listPage");
  productHTML = ``;

  for (let i = 0; i < totalPage; i++) {
    if (pageNo == i)
      productHTML += `<li><a href="#" class="link active">${i + 1}</a></li>
    `
    else
      productHTML += `<li><a href="#" class="link">${i + 1}</a></li>
    `
  }
  listPage.innerHTML = productHTML;

  pageButtons = document.querySelectorAll('.link')
  pageButtons.forEach(button => {
    button.addEventListener('click', () => {
      pageNo = button.innerHTML - 1;
      dataTable();
    })
  })
}

async function buttonPrevNext() {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#btn-prev").addEventListener("click", () => {
      pageNo -= 1
      dataTable();
      document.querySelector('#btn-next button').classList.remove('inactive');
    });

    document.querySelector("#btn-next").addEventListener("click", () => {
      pageNo += 1
      dataTable();
      document.querySelector('#btn-prev button').classList.remove('inactive');
    });
  })
}

buttonPrevNext();
dataTable();
