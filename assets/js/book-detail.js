const bookId = new URLSearchParams(window.location.search).get('bookId');

let quantity = 1;
let bill = 0;
let price = 0;
let calculateBill = 0;
let responsive = '';
let date = '';
let minus = document.querySelector('.minus');


async function getBookData() {
  var apiUrl = `http://localhost:8080/api/book/${bookId}`;
  const data = await fetch(apiUrl);
  const res = await data.json();
  responsive = res;
  date = responsive.publishedYear;

  // showBookDetail(responsive);
}
getBookData()


console.log(responsive);

showBookDetail = (item) => {

  let bookDetailHTML = `
    <div class="container">
      <div class="product book-detail">
        <div class="info-image">
          <div class="book-image">
            <img src="${item.image}" alt="">
          </div>
          <div class="all-info">
            <div class="item-2 info-basic">
              <h3>Tác giá: <a>${item.authorId}</a></h3>
              <h2>${item.title}</h2>
              <div class="stars-quantity">
                <ul class="stars-reviews">
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                </ul>
                <div class="separator-3"></div>
                <p>Còn: <span>${item.quantity}</span></p>
              </div>
              <p class="product-price">
                ${(item.price / 1000).toFixed(3)}
                <span>₫</span>
              </p>
            </div>
            <div class="item-2 product-description">
              <div class="description">
                <h3>Mô tả sản phẩm</h3>
                <p>“${item.description}”
                </p>
                <div class="gradient"></div>
              </div>
              <a class="seeMore">Xem thêm</a>
              <a class="recall">Thu gọn</a>
            </div>
            <div class="item-2 details">
              <h3>Thông tin chi tiết</h3>
              <div class="item-details">
                <div class="content">
                  <span>Công ty phát hành</span>
                  <span>${item.publisherId}</span>
                </div>
                <div class="content">
                  <span>Năm xuất bản</span>
                  <span>${date[2]}-${date[1]}-${date[0]}</span>
                </div>
                <div class="content">
                  <span>Chủ đề</span>
                  <span>Truyền cảm hướng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="product bill item-2">
        <div class="quantity">
          <p class="label">Số lượng</p>
          <div class="item-quantity">
            <button class="minus" onclick="decrease()">
              <img src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg"
                alt="remove-icon">
            </button>
            <input type="text" class="input" value="${quantity}" readonly="readonly"/>
            <button class="plus" onclick="increase()">
              <img src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg"
                alt="add-icon">
            </button>
          </div>
        </div>
        <div class="calculator">
          <p class="label">Tạm tính</p>
          <div class="money">
            ${calculateBill}
            <span>₫</span>
          </div>
        </div>
        <div class="group-button">
          <button class="rent-now button">Thuê</button>
          <button class="add-cart button">Thêm vào giỏ</button>
        </div>
      </div>
    </div>
  `

  let bookDetail = document.getElementById('showBook');
  bookDetail.innerHTML = bookDetailHTML;
}



async function increase() {
  quantity += 1;
  await getBookData();
  showBookDetail(responsive);
  calculateTotalAmount()
}

async function decrease() {
  quantity -= 1;
  await getBookData();
  showBookDetail(responsive);
  calculateTotalAmount();
}

async function calculateTotalAmount() {
  await getBookData();
  let price = responsive.price;
  calculateBill = ((quantity * price) / 1000).toFixed(3);
  showBookDetail(responsive);
}

calculateTotalAmount()
