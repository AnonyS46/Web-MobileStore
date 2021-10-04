var keyCartItems='cartItems'
var itemRow=document.querySelector('.cart-item-row')

var iconCartQuantity=document.querySelector('.cart-quantity')

var iconCartQuantitySmall=document.querySelector('.cart-quantity-sm')



function createNewItem(id,name,price,quantity) {
    return {
        id: id,
        name:name,
        price:price,
        quantity: quantity,
    }
}

function getCartItemsFromLocalStorage() {
    var result = JSON.parse(localStorage.getItem(keyCartItems));
    if(result)
    {
        return result;
    }
    return [];
}

function addToLocalStorage(cartItems) {
    localStorage.setItem(keyCartItems,JSON.stringify(cartItems))
}

function loadCartItemsFromLocalStorage() {
    var cartItems = getCartItemsFromLocalStorage();
    var html=''

    if(cartItems.length > 0) {
        html+=cartItems.map(item => `
            <tr class="align-middle" data-id="${item.id}">
                <th scope="row">
                    <div class="cart-item">
                        <img src="https://cdn.tgdd.vn/Products/Images/42/213031/iphone-12-xanh-duong-600x600.jpg" alt="" class="cart-item-img">
                    </div>
                </th>
                <td>${item.name}</td>
                <td class="pro-price" data-price="${item.price}">${(Number(item.price)).toLocaleString()}đ</td>
                <td>
                    <input class="input-quantity" type="text" value="${item.quantity}" style="width: 30px; text-align: center;">
                </td>
                <td class="pro-total-money">${(item.price*item.quantity).toLocaleString()}</td>
                <td>
                    <button class="btn btn-danger btn_remove" onclick="deleteCartItem(${item.id})">Xóa</button>
                </td>
            </tr>
        `).join('')
        itemRow.innerHTML=html+`
            <tr class="align-middle">
                <td  colspan="4" style="text-align:right;">
                    <p style="margin-right:40px; margin-bottom:0;">Thành tiền:</p>
                </td>
                <td class="amount_money"></td>
                <td>
                    <button class="btn btn-primary">Thanh toán</button>
                </td>
            </tr>
        `
    } else {
        itemRow.innerHTML=`<td colspan="6" align="center">Bạn chưa thêm sản phẩm nào vào giỏ hàng</td>`
    }
}

function changeQuantityUpdate(proId) {
    var inputQuantity=document.getElementsByClassName('input-quantity')

    for(var i=0; i<inputQuantity.length;i++) {
        inputQuantity[i].addEventListener('change',function() {
            var newQuantity = this.value;
            
            var proPrice=this.parentElement.parentElement.querySelector('.pro-price').dataset.price

            this.parentElement.parentElement.querySelector('.pro-total-money').innerHTML=(parseInt(newQuantity,10)*parseInt(proPrice,10)).toLocaleString()

            var proId=this.parentElement.parentElement.dataset.id

            var cartItems= getCartItemsFromLocalStorage()

            for(var i=0; i<cartItems.length; i++) {
                if(cartItems[i].id===proId) {
                    cartItems[i].quantity=newQuantity;
                }
            }
            addToLocalStorage(cartItems)

            caculateAmountMoney()

         })
    }
}

function setIconCartQuantity() {
    var itemQuantity=getCartItemsFromLocalStorage().length
    
    iconCartQuantity.innerHTML=itemQuantity
    iconCartQuantitySmall.innerHTML=itemQuantity

}

function deleteCartItem(proId) {
    var cartItems=getCartItemsFromLocalStorage()

    var product=cartItems.find(item => item.id===proId);

    cartItems.splice(cartItems.indexOf(product),1)

    addToLocalStorage(cartItems)

    location.reload();
}

function caculateAmountMoney() {
    var cartItems= getCartItemsFromLocalStorage()

    var total=0;

    for (var i= 0; i <cartItems.length; i++) {

        total += parseInt(cartItems[i].quantity,10)*parseInt(cartItems[i].price,10);
    }
    if(cartItems.length>0) { 
        document.querySelector('.amount_money').innerHTML=total.toLocaleString()
    }
}