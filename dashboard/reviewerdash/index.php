<!doctype html>
<html lang="en" itemscope itemtype="http://schema.org/WebPage">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title> Reviewer - Dashboard</title>
    <meta name="title" Content="Author - Dashboard">

    <meta name="description" content="asfiresearchjournal">
    <meta name="keywords" content="asfiresearchjournal">
    <link rel="shortcut icon" href="../../assets/images/logoIcon/favicon.png" type="image/x-icon">

    
    <link rel="apple-touch-icon" href="../../assets/images/logoIcon/logo.png">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="Author - Dashboard">
    
    <meta itemprop="name" content="Author - Dashboard">
    <meta itemprop="description" content="asfiresearchjournal">
    <meta itemprop="image" content="../assets/images/seo/65be1258275121706955352.png">
    
    <meta property="og:type" content="website">
    <meta property="og:title" content="ASFIRJ">
    <meta property="og:description" content="asfiresearchjournal">
    <meta property="og:image" content="../assets/images/seo/65be1258275121706955352.png"/>
    <meta property="og:image:type" content="png"/>
    <meta property="og:image:width" content="1180" />
    <meta property="og:image:height" content="600" />
    <meta property="og:url" content="/user/dashboard.html">
    
    <meta name="twitter:card" content="summary_large_image">
    <!-- Bootstrap CSS -->
    <link href="../../assets/global/css/bootstrap.min.css" rel="stylesheet">
    <!-- <link href="../../css/bootstrap.css" rel="stylesheet">
      
    <link href="../../css/bootstrap-responsive.css" rel="stylesheet"> -->

    <link href="../../assets/global/css/all.min.css" rel="stylesheet">

    <link rel="stylesheet" href="../../assets/global/css/line-awesome.min.css" />

    <link rel="stylesheet" href="../../assets/templates/metro_hyip/css/main.css">

    <link rel="stylesheet" href="../../assets/templates/metro_hyip/css/custom.css">
    <link rel="stylesheet" href="../../css/style.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

    
    
    <link rel="stylesheet" href="../../assets/templates/metro_hyip/css/color.php?color=EB4830&secondColor=">
    <link rel="stylesheet" href="../../front/public/css/header.css">
    <script type="text/javascript">
        function googleTranslateElementInit() {
            new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
        }
    </script>

    <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>

</head>

<body>
    
    <div class="preloader">
        <div class="loader-p"></div>
    </div>

    <div class="body-overlay"></div>

    <div class="sidebar-overlay"></div>

    <a class="scroll-top"><i class="fas fa-angle-double-up"></i></a>

    <div class="dashboard-fluid position-relative">
        <div class="dashboard-header">

            <div class="dashboard-header__inner">
                
                <div class="dashboard-header__left">
                    <a href="" class="sidebar-logo__link"> <img src="../../assets/images/logoIcon/logo.png" alt="site-logo"></a>
                </div>
                <div class="dashboard-header__right">
                    <div class="user-info">
                        <div class="user-info__button">
                            <div class="user-info__info">
                                
                                <span class="fw-bold user_fullnameContainer">
                                  
                                </span>
        
                                    <!-- <ul class="user-info-dropdown">
                                    <li class="user-info-dropdown__item"><a class="user-info-dropdown__link"
                                            href="../../user/profile-setting.html">Profile Setting</a></li>
                                    <li class="user-info-dropdown__item"><a class="user-info-dropdown__link"
                                            href="../../user/change-password.html">Change Password</a></li>
                                                                <li class="user-info-dropdown__item"><a class="user-info-dropdown__link"
                                            href="../../user/logout">Logout</a></li>
                                </ul>
                                <div class="user-info__content">
                                    <div class="d-flex justify-content-around">
                                        <span class="user-info__name" id="user_fullnameContainer"></span>
                                        <span><i class="las la-angle-down"></i></span>
                                    </div>
                                    <span class="user-info__link" id="user_emailContainer"> </span>
                                </div> -->
        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="background-color: #310357;" id="navbarContainer">
        
        </div>
        <div class="dashboard__inner">
            <div class="sidebar-menu" id="userMenu">
                <div class="submission-header-dash" style="margin-top: 30px;">
                    <div style="text-align: center; margin: 20px;"><span class="fw-bold" style="color: #404040;">Reviewer Dashboard</span></div>
                    
                    
                    <ul class="submit-nav">
                        <a href=""><li style="background-color: #320359;"> <span class="reviewsCount">0</span> Review and Score</li></a>
                        <a href="./submitted/"><li > <span class="submittedReviewsCount">0</span> Reviews Submitted</li></a>
                        <!-- <a href=""><li>Submit New Manuscript</li></a> -->
                        <!-- <a href="./invitations.html"><li> <span>0</span> Invitations</li></a> -->
                        <a href="../../../portal/logout/"><li>Logout</li></a>
                        
                    </ul>
                </div>
            </div>
            <!-- ========= Sidebar Menu End ================ -->
            <div class="dashboard__right">
                

<div class="dashboard-body__bar d-xl-none d-block mt-2 text-end">
    <span class="dashboard-body__bar-icon"><i class="las la-bars"></i></span>
</div>
                <div class="dashboard-body">
                    <section class="mt-3 mb-60">

        <div class="row gy-2 justify-content-center">
            <span style="font-size: 35px; color: #320359;">Review and Score</span>
            <div class="table_container">
                <table id="table-dash" class="">
                    <thead>
                        <tr class="section-title">
                            <th>ACTION</th>
                            <th>DUE DATE</th>
                            <th>TYPE</th>
                            <th>ID/TITLE</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody >
              
    <?php
    
     $user = $_COOKIE["user"];
    // $url = "http://localhost/asfirj_submission_controls/backend/reviewers/toReview.php?user=$user";

    $url = "https://cp.asfirj.org/backend/reviewers/toReview.php?user=$user";
    $content = file_get_contents($url);
    if ($content !== false) {
        echo $content;
    } else {
        echo 'Error fetching content from URL';
    }
    ?>


                        <!-- <tr id="queue_0" name="queue_0" role="row" class="odd">         
               <td data-label="status">              
                        
                        <form action="./score/" class="actionForm">
                            <select name="action" id="" class="form-control action">
                                <option value="">action</option>
                                <option value="review">Review & Score</option>
                            </select>
                        </form>  
                        
                    </td>
        
                    <td data-label="ID">
                        29-May-2024
                    
                    </td>
                                          
                    <td data-label="title" style="white-space:pre-wrap">Original Article
             </td>
                    <td class="whitespace-nowrap" data-label="submitted">
                        <span>ASFIRJ-2024-215540.R2</span><br><br>
                        Does use of hormonal contraceptives impact on severe exacerbation in women with asthma? A 17-year population-based cohort study
                    </td>
                    <td data-label="decisioned" class="whitespace-nowrap">PENDING</td>
               </tr>
   -->
                    </tbody>
                    
                </table>

            </div>
            

        </div>

       
        

        
    </section>
                </div>
            </div>
        </div>
    </div>
<div id="google_translate_element"></div>
        
    <script src="../../assets/global/js/jquery-3.6.0.min.js"></script>
    <script src="../../assets/global/js/bootstrap.bundle.min.js"></script>
    <script src="../../assets/templates/metro_hyip/js/main.js"></script>
    <script type="module" src="../../js/dashboards/author.js"></script>
    <script type="module" src="../../js/dashboards/toReview.js"></script>

            <script>
        'use strict';
        (function($) {
                    })(jQuery);
    </script>

    
    <link rel="stylesheet" href="../../assets/global/css/iziToast.min.css">
<script src="../../assets/global/js/iziToast.min.js"></script>



    <script src="../../assets/global/js/firebase/firebase-8.3.2.js"></script>


    <script>
        (function($) {
            "use strict";
            $(".langSel").on("change", function() {
                window.location.href = "../change/" + $(this).val();
            });

            $('.policy').on('click', function() {
                $.get('../cookie/accept', function(response) {
                    $('.cookies-card').addClass('d-none');
                });
            });

            setTimeout(function() {
                $('.cookies-card').removeClass('hide')
            }, 2000);

            var inputElements = $('[type=text],[type=password],[type=email],[type=number],select,textarea');
            $.each(inputElements, function(index, element) {
                element = $(element);
                element.closest('.form-group').find('label').attr('for', element.attr('name'));
                element.attr('id', element.attr('name'))
            });

            $.each($('input, select, textarea'), function(i, element) {
                var elementType = $(element);
                if (elementType.attr('type') != 'checkbox') {
                    if (element.hasAttribute('required')) {
                        $(element).closest('.form-group').find('label').addClass('required');
                    }
                }
            });

            Array.from(document.querySelectorAll('table')).forEach(table => {
                let heading = table.querySelectorAll('thead tr th');
                Array.from(table.querySelectorAll('tbody tr')).forEach((row) => {
                    Array.from(row.querySelectorAll('td')).forEach((colum, i) => {
                        colum.setAttribute('data-label', heading[i].innerText)
                    });
                });
            });

        })(jQuery);
    </script>

    <script>
        const actionForm = document.querySelectorAll(".actionForm")

        actionForm.forEach(form => {
            const actionsDropdown = form.querySelectorAll(".action");
        actionsDropdown.forEach(action =>{
            action.addEventListener("change", function(){
                form.submit()
            })
        })
     
        })
    </script>
    <script type="module" src="../../js/dashboards/countItems.js"></script>
</body>

</html>