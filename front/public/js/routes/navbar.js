import { ValidateLogin } from "./vaidateLogin.js";

ValidateLogin()

// CHECK FOR ACTIVE PAGES 
function getURL(){
    return window.location.pathname
}

const url = getURL()

// if(url === `/${parentDirectoryName}/issues.html`){
//     activeIssues = 'active'
// }

// if(url === `/${parentDirectoryName}/about.html`){
//     activeAbout = 'active'
// }

// if(url === `/${parentDirectoryName}/editors.html`){
//     activeEditors = 'active'
// }

// if(url === `/${parentDirectoryName}/authors.html`){
//     activeAuthors = 'active'
// }

// if(url === `/${parentDirectoryName}/reviewers.html`){
//     activeReviewers = 'active'
// }

// if(url === `/${parentDirectoryName}/events.html`){
//     activeEvents = 'active'
// }

// if(url === `/${parentDirectoryName}/contact.html`){
//     activeContact = 'active'
// }

const NavigationContainer = document.getElementById("userMenu")

const navItems  = `  <span class="sidebar-menu__close d-xl-none d-block"><i class="las la-times"></i></span>
<!-- Sidebar Logo Start -->
<div class="sidebar-logo">
    <a href="../index.html" class="sidebar-logo__link"> <img src="../assets/images/logoIcon/logo.png" alt="site-logo"></a>
</div>
<!-- Sidebar Logo End -->
<!--==== account start ==== -->
<div class="balance">
    <h5 class="balance__title"> Account Balance </h5>
    <div class="balance__item">
        <span class="balance__item-wallet"> Deposit Wallet </span>
        <h5 class="balance__item-number"> <span id="accountBalance"></span> <span class="balance__item-currency">USD</span> </h5>
    </div>
    <div class="balance__item">
        <span class="balance__item-wallet"> Interest Wallet </span>
        <h5 class="balance__item-number">
           
            <span id="interestWallet"></span>
            <span class="balance__item-currency">USD</span> 
        </h5>
    </div>
    <div class="balance__button">
        <a href="../user/deposit.html" class="balance__button-one style-one"> Deposit </a>
        <a href="../user/withdraw.html" class="balance__button-one style-two"> Withdraw </a>
    </div>
</div>
<!--===== account end ===== -->

<!-- ========= Sidebar Menu Start ================ -->
<ul class="sidebar-menu-list mt-5">
    <li class="sidebar-menu-list__item active ">
        <a href="../user/dashboard.html" class="sidebar-menu-list__link ">
            <span class="icon"><i class="fas fa-tachometer-alt"></i></span>
            <span class="text">Dashboard</span>
        </a>
    </li>
    <li class="sidebar-menu-list__item  ">
        <a href="../plan.html" class="sidebar-menu-list__link ">
            <span class="icon"><i class="fas fa-funnel-dollar"></i></span>
            <span class="text">Investment</span>
        </a>
    </li>
                <!-- <li class="sidebar-menu-list__item  ">
            <a href="../user/invest/schedule" class="sidebar-menu-list__link ">
                <span class="icon"><i class="fas fa-calendar-check"></i></span>
                <span class="text">Schedule Investment</span>
            </a>
        </li> -->
             
        <!-- <li class="sidebar-menu-list__item  ">
            <a href="../user/staking" class="sidebar-menu-list__link ">
                <span class="icon"><i class="fas fa-chart-line"></i></span>
                <span class="text">Staking</span>
            </a>
        </li> -->
             
        <!-- <li class="sidebar-menu-list__item  ">
            <a href="../user/pool" class="sidebar-menu-list__link ">
                <span class="icon"><i class="fas fa-cubes"></i></span>
                <span class="text">Pool</span>
            </a>
        </li> -->
            <li class="sidebar-menu-list__item has-dropdown ">
        <a href="javascript:void(0)" class="sidebar-menu-list__link">
            <span class="icon"><i class="fas fa-wallet"></i></span>
            <span class="text">Deposit</span>
        </a>
        <div class="sidebar-submenu">
            <ul class="sidebar-submenu-list">
                <li class="sidebar-submenu-list__item ">
                    <a href="../user/deposit.html" class="sidebar-submenu-list__link">Deposit Now</a>
                </li>
                <li class="sidebar-submenu-list__item ">
                    <a href="../user/deposit/history.html" class="sidebar-submenu-list__link">Deposit History</a>
                </li>
            </ul>
        </div>
    </li>
    <li class="sidebar-menu-list__item has-dropdown ">
        <a href="javascript:void(0)" class="sidebar-menu-list__link">
            <span class="icon"><i class="fas fa-hand-holding-usd"></i></span>
            <span class="text">Withdraw</span>
        </a>
        <div class="sidebar-submenu ">
            <ul class="sidebar-submenu-list">
                <li class="sidebar-submenu-list__item ">
                    <a href="../user/withdraw.html" class="sidebar-submenu-list__link">Withdraw Now</a>
                </li>
                <li class="sidebar-submenu-list__item ">
                    <a href="../user/withdraw/history.html" class="sidebar-submenu-list__link">Withdraw History</a>
                </li>
            </ul>
        </div>
    </li>

            <li class="sidebar-menu-list__item ">
        <a href="../user/transactions.html" class="sidebar-menu-list__link">
            <span class="icon"> <i class="fas fa-exchange-alt"></i> </span>
            <span class="text"> Transactions </span>
        </a>
    </li>
    <li class="sidebar-menu-list__item ">
        <a href="../user/referrals.html" class="sidebar-menu-list__link">
            <span class="icon"> <i class="fas fa-users"></i> </span>
            <span class="text"> Referrals </span>
        </a>
    </li>

    
                <!-- <li class="sidebar-menu-list__item ">
            <a href="../user/invest/ranking" class="sidebar-menu-list__link">
                <span class="icon"><i class="las la-crown"></i></span>
                <span class="text"> Ranking</span>
            </a>
        </li> -->
    
    <!-- <li class="sidebar-menu-list__item has-dropdown ">
        <a href="javascript:void(0)" class="sidebar-menu-list__link">
            <span class="icon"><i class="fas fa-ticket-alt"></i></span>
            <span class="text">Support Ticket</span>
        </a>
        <div class="sidebar-submenu ">
            <ul class="sidebar-submenu-list">
                <li class="sidebar-submenu-list__item active">
                    <a href="../ticket/new" class="sidebar-submenu-list__link">Open Ticket</a>
                </li>
                <li class="sidebar-submenu-list__item">
                    <a href="../ticket" class="sidebar-submenu-list__link">My Tickets</a>
                </li>

            </ul>
        </div>
    </li> -->
    <!-- <li class="sidebar-menu-list__item ">
        <a href="../user/twofactor" class="sidebar-menu-list__link">
            <span class="icon"><i class="fas fa-lock"></i></span>
            <span class="text"> 2FA Security </span>
        </a>
    </li> -->
    <li class="sidebar-menu-list__item">
        <a href="../user/logout" class="sidebar-menu-list__link">
            <span class="icon"><i class="fas fa-sign-out-alt"></i></span>
            <span class="text">Logout</span>
        </a>
    </li>
</ul>

<div class="bottom-footer py-3">
    <div class="container">
        <div class="row gy-3">
            <div class="col-md-12 text-center">
                <div class="bottom-footer-text text-white"> &copy; 2024
                    <a href="..">Alpha Forex Lyfe</a> All Rights Reserved.
                </div>
            </div>
        </div>
    </div>
</div>`



NavigationContainer.innerHTML = navItems