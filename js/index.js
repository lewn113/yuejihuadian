/* 业务1：点击导航栏跳转到相应内容 */
const nav_ul = document.querySelector('.nav ul')
nav_ul.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' || e.target.tagName === "SPAN") {     // 找到ul里面的a标签
        // console.log(e.target);        // 此时的e.target返回a标签
        // 文字变色
        document.querySelector('.nav .active').classList.remove('active')
        e.target.classList.add('active')
    }
    if (e.target.tagName === 'A') {
        // 联动内容
        document.querySelector('.content>.active').classList.remove('active')
        // console.log(e.target.dataset.id);
        document.querySelector(`.content .item:nth-child(${e.target.dataset.id})`).classList.add('active')
    }
})
// 点击我的订单出现下拉菜单，失去焦点隐藏下拉菜单 
const myOrder = document.querySelector('.nav .myOrder')
myOrder.addEventListener('click', function() {
    document.querySelector('.nav .detile').style.display = 'block'
})
window.addEventListener('mousedown', function(e) {
    if (e.target.dataset.id !== '4' && e.target.dataset.id !== '5') {
        document.querySelector('.nav .detile').style.display = 'none'
    }
})

/* 业务2：轮播图轮播 */
// 给左右两边的按钮设置点击事件
const btn1 = document.querySelector('.banner .btn1')
const btn2 = document.querySelector('.banner .btn2')
const banner_pic = document.querySelectorAll('.banner .left .pic a')
const banner_dot = document.querySelectorAll('.banner .left .dot li')
let i = 0
btn2.addEventListener('click', function() {
    if (i >= banner_pic.length-1) {
        i = -1
    }
    i++
    banner()
})
btn1.addEventListener('click', function() {
    if (i <= 0) {
        i = banner_pic.length
    }
    i--
    banner()
})
function banner() {
    document.querySelector('.banner .left .pic .active').classList.remove('active')
    document.querySelector('.banner .left .dot .active').classList.remove('active')
    banner_pic[i].classList.add('active')
    banner_dot[i].classList.add('active')
}
// 定时轮播
let timer1 = setInterval(function() {
    btn2.click()
},2000)
// 鼠标滑过暂停/开始轮播
const pic = document.querySelectorAll('.banner .left .pic')
pic[0].addEventListener('mouseenter', function() {
    clearInterval(timer1)
})
pic[0].addEventListener('mouseleave', function() {
    timer1 = setInterval(function() {
        btn2.click()
    },2000)
})

/* 业务3：限时折扣倒计时 */
// 倒计时走起来
function discount_time() {
    // 计算时间
    const current_time = +new Date()
    const endding_time = +new Date('2023-7-15 12:00:00')
    const discount_time = endding_time - current_time
    const total_s = (discount_time/1000)
    const d = parseInt(total_s / 60 / 60 / 24)
    let h = parseInt(total_s / 60 / 60 % 24)
    let m = parseInt(total_s / 60 % 60)
    let s = parseInt(total_s % 60)
    h = h < 10 ? '0'+h : h 
    m = m < 10 ? '0'+m : m 
    s = s < 10 ? '0'+s : s 
    // 渲染进页面
    document.querySelector('.index1 .discount .countdown .endding_time').children[0].innerHTML = `${d}天`
    document.querySelector('.index1 .discount .countdown .endding_time').children[1].innerHTML = `${h}小时${m}分${s}秒`
}
discount_time()
setInterval(discount_time,1000)

/* 业务4：电梯导航变色 */
const new_product = document.querySelector('.content .index1 .new_product')
const recommend = document.querySelector('.content .index1 .recommend')
const discount = document.querySelector('.content .index1 .discount')
const elevator_children = document.querySelectorAll('.elevator div')
window.addEventListener('scroll', function() {
    if (this.document.documentElement.scrollTop >= discount.offsetTop-1) {
        discount.nextElementSibling.style.opacity = 1
        for (let i = 0; i < elevator_children.length; i++) {
            elevator_children[i].classList.remove('active')
        }
        elevator_children[2].classList.add('active')
    } else if (this.document.documentElement.scrollTop >= recommend.offsetTop-1) {
        discount.nextElementSibling.style.opacity = 1
        for (let i = 0; i < elevator_children.length; i++) {
            elevator_children[i].classList.remove('active')
        }
        elevator_children[1].classList.add('active')
    } else if (this.document.documentElement.scrollTop >= new_product.offsetTop-1) {
        discount.nextElementSibling.style.opacity = 1
        for (let i = 0; i < elevator_children.length; i++) {
            elevator_children[i].classList.remove('active')
        }
        elevator_children[0].classList.add('active')
    } else {
        discount.nextElementSibling.style.opacity = 0
    }
})

/* 业务5：电梯导航点击跳转 */
elevator_children[0].addEventListener('click',function() {
    document.documentElement.scrollTop = new_product.offsetTop
})
elevator_children[1].addEventListener('click',function() {
    document.documentElement.scrollTop = recommend.offsetTop
})
elevator_children[2].addEventListener('click',function() {
    document.documentElement.scrollTop = discount.offsetTop
})
elevator_children[3].addEventListener('click',function() {
    document.documentElement.scrollTop = 0
})

/* 业务6：购物车全选反选 */
// 大按钮选中，则小按钮全部选中
const check = document.querySelectorAll('.index6 li .check')
const checkAll = document.querySelector('.index6 .background>.bottom .checkAll')
checkAll.addEventListener('click', function() {
    if (checkAll.checked === true) { 
        for (let i = 0; i < check.length; i++) {
            check[i].checked = true
        }
    } else {
        for (let i = 0; i < check.length; i++) {
            check[i].checked = false
        }
    }
})
// 小按钮全部选中，则大按钮选中；小按钮有一个没选中，则大按钮不选中
let cart_count = 0
for (let i = 0; i < check.length; i++) {
    check[i].addEventListener('click', function() {
        if (check[i].checked === true) {
            cart_count++
        } else {
            cart_count--
        }
        if (cart_count === check.length) {
            checkAll.checked = true
        } else {
            checkAll.checked = false
        }
    })
}

/* 业务7：购物车加减号与数量联动 */



/* 业务8：购物车合计模块 */
