const getCatagory = async function () {
   const url = `https://openapi.programming-hero.com/api/news/categories`;
   try {
      const res = await fetch(url);
      const data = await res.json();
      displayCatagory(data.data.news_category);
   } catch (error) {
      console.log(error);
   }
};
const displayCatagory = (categories) => {
   const categorieContainer = document.getElementById('category-container');
   categories.forEach((catagorie) => {
      const li = document.createElement('li');
      li.innerHTML = `
      <a href="javascript:void(0)" onclick='getNews(${catagorie.category_id}, "${catagorie.category_name}")'>${catagorie.category_name}</a>
      `;
      categorieContainer.appendChild(li);
   });
};
getCatagory();

const getNews = async function (id, name) {
   toggleLoader(true);
   const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
   try {
      const res = await fetch(url);
      const data = await res.json();
      displayNews(data.data, name);
   } catch (error) {
      console.log(error);
   }
};
const displayNews = (news, name) => {
   console.log(name);
   const singleNewsContainer = document.getElementById('singleNews-container');
   singleNewsContainer.innerHTML = '';
   const categoryCountText = document.getElementById('category-count-massege');
   if (news.length === 0) {
      categoryCountText.innerText = 'No items found';
   } else {
      categoryCountText.innerText = `${news.length} items found for catagorie ${name}`;
      news.sort((a, b) => {
         return b.total_view - a.total_view;
      });
      news.forEach((singleNews) => {
         //  console.log(singleNews._id);
         const div = document.createElement('div');
         div.classList.add('card');
         div.classList.add('mb-4');
         div.innerHTML = `
      <div class="row g-0">
      <div class="col-md-4 p-3">
         <img src="${singleNews.image_url}" class="img-fluid rounded-start h-100" alt="..." />
      </div>
      <div class="col-md-8">
         <div class="card-body mt-4">
            <h5 class="card-title">${singleNews.title}</h5>
            <p class="card-text my-3">${singleNews.details.slice(0, 400)}...</p>
            <div class="info-container d-flex align-items-center justify-content-between  py-2">
            <div class="d-flex align-items-center">
            <img src='${singleNews.author.img} class="img-fluid"'>
                <div class="author-info">
                <p class'author-name'>${singleNews.author.name ? singleNews.author.name : 'N/A'}</p>
                <p class="date"> ${
                   singleNews.author.published_date ? singleNews.author.published_date.slice(0, 11) : 'N/A'
                }</p>
                </div>
            </div>
                <div class='view-count fw-bold'> <i class="fa-regular fa-eye"></i> ${
                   singleNews.total_view ? singleNews.total_view + 'M' : 'N/A'
                } </div> 
                <div class="read-more"> 
                <button class='read-more-btn' onclick='getNewsDetails("${
                   singleNews._id
                }")' data-bs-toggle="modal" data-bs-target="#newsModal"> Read More <i class="fa-solid fa-arrow-right-long"></i> </button>
                </div>
            </div>           
         </div>
         
      </div>
   </div>
      `;
         singleNewsContainer.appendChild(div);
      });
   }

   toggleLoader(false);
};
// GET NEWS DETAILS
const getNewsDetails = (news_id) => {
   const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
   fetch(url)
      .then((res) => res.json())
      .then((data) => displayNewsDetails(data.data[0]));
};
const displayNewsDetails = (details) => {
   const modalTitle = document.getElementById('newsModalLabel');
   const modalBodyText = document.getElementById('modal-body-text');
   const modalAuthorName = document.getElementById('modal-author-name');
   const modalViewsCount = document.getElementById('modal-views-count');
   modalTitle.innerText = details.title;
   modalBodyText.innerText = details.details;
   modalAuthorName.innerText = `Author: ${details.author.name ? details.author.name : 'N/A'}`;
   modalViewsCount.innerText = `views: ${details.total_view ? details.total_view + 'M' : 'N/A'}`;
};
// LOADER
function toggleLoader(isloading) {
   const loadingSpinner = document.getElementById('loader');
   if (isloading) {
      loadingSpinner.classList.remove('d-none');
   } else {
      loadingSpinner.classList.add('d-none');
   }
}
getNews(8, 'All news');
