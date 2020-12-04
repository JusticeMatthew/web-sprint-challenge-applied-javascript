// STEP 3: Create article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-api.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a card for each article in the response.
// This won't be as easy as just iterating over an array though.
//
// Write a function that takes a single article object and returns the following markup:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {author's name}</span>
//   </div>
// </div>
//
// Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
//
// Use your function to create a card for each of the articles, and append each card to the DOM.

axios.get('https://lambda-times-api.herokuapp.com/articles')
    .then(res => {
        const newArr = Object.entries(res.data.articles); // The data was so nested I needed to make some conversions so I could iterate better
        const cardsArr = newArr.map(topic => {
            return Cardgen(topic[1])
        })
        cardsArr.forEach(arr => arr.forEach(card => document.querySelector('.cards-container').appendChild(card)))
    })
    .catch(err => console.log('Error', err));

// Takes a single object! That was a pain
function Cardgen(article) {

    const cardArr = article.map(item => {

        const card = document.createElement('div');
        const headline = document.createElement('div');
        const authDiv = document.createElement('div');
        const imgContainer = document.createElement('div');
        const cardImg = document.createElement('img');
        const authName = document.createElement('span');

        card.appendChild(headline);
        card.appendChild(authDiv);
        authDiv.appendChild(imgContainer);
        authDiv.appendChild(authName);
        imgContainer.appendChild(cardImg);

        card.classList.add('card');
        headline.classList.add('headline');
        authDiv.classList.add('author');
        imgContainer.classList.add('img-container');

        headline.textContent = item.headline;
        cardImg.src = item.authorPhoto;
        authName.textContent = `By ${item.authorName}`;

        // This was so hard to figure out, my goodness!
        function clicky(event) {
            console.log(headline.textContent);
            event.stopPropagation();
        }

        card.onclick = clicky;

        return card;

    })

    return cardArr;

}