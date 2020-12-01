const fruits = [
    {id: 1, title: 'Apples', price: 20, img: 'https://zambianews365.com/wp-content/uploads/2020/06/apple.jpg'},
    {
        id: 2,
        title: 'Oranges',
        price: 30,
        img: 'https://schachtgroves.com/wp-content/uploads/2020/10/1_0002_valencia.jpg'
    },
    {id: 3, title: 'Mangoes', price: 40, img: 'https://www.kroger.com/product/images/xlarge/front/0000000004312'}

]

const toHTML = fruit => `
 <div class="col">
            <div class="card">
                <img src="${fruit.img}"
                     class="card-img-top" alt="${fruit.title}" style="height: 300px">
                <div class="card-body">
                    <h5 class="card-title">${fruit.title}</h5>
                    <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Look price</a>
                    <a href="#" class="btn btn-danger">Delete</a>
                </div>
            </div>
            </div>`

/*
* 1. Динамически на основе массива вывести карточки
* 2. Показать цену в модалке( должна быть одна и та же модалка)
* 3. Модалка для удаления с 2мя кнопками
* ________________________________
* 4.При нажатии на кноку отмены, ничего не происходит, а при нажатии на ОК - карточка удаляется из дом дерева
* (На основе плагина $.modal нужно сделать другой плагин $.confirm на промисах)
*
* */

function render() {
    const html = fruits.map(fruit => toHTML(fruit)/*the same as (toHTML)*/).join('')
    document.querySelector('#fruits').innerHTML = html
}

render()

const priceModal = $.modal({
    title: 'Price',
    closable: true,
    width: '400px',
    footerButtons: [
        {
            text: 'Close', type: 'primary', handler() {
            }
        },
    ]
})

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id


    if (btnType === 'price') {
        const fruit = fruits.find(f => f.id === id)

        priceModal.setContent(`
        <p>Price of ${fruit.title} is <strong>${fruit.price}$</strong></p>`
        )

        priceModal.open()
    }
})
