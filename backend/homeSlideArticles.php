<?php
include 'db.php';
include "authorsSearchSlider.php";

$FID_IMAGE = 'SELECT * FROM `journals` WHERE 1 ORDER BY `id` DESC LIMIT 3';
$Feed_IMAGE = mysqli_query($con, $FID_IMAGE);
  
$count = mysqli_num_rows($Feed_IMAGE);

if($count > 0){
 

    while($row = mysqli_fetch_assoc($Feed_IMAGE)){

        $ArticleTitle = $row['manuscript_full_title'];
        $ArticlePhoto = $row['manuscriptPhoto'];
        $ArticleId = $row['buffer'];
        $ArticleDate =  $row['date_uploaded'];
        echo "
                <div class='item' style='background-image: url(./useruploads/article_images/$ArticlePhoto); background-size:cover;'>
                <div class='carousel-caption article-info1'>
                    <span class='articleDateContainer'>
                    <input type='hidden'  value='$ArticleDate'>
                    $ArticleDate</span>

                    <div class=' big'>
                        <div class='inner-layer'>
                            <div data-animation='reveal-text' data-delay='1s'>
                                <span style='animation-delay: 1s;'></span>
                                <a href='./content?sid=$ArticleId&title=$ArticleTitle'
                                    class='article-title u-text u-text-palette-5-light-3 u-text-2'>

                                    $ArticleTitle.
                                </a>
                            </div>
                        </div>

                        <div class='small'>
                            <div class='inner-layer'>
                                <p class='u-text u-text-palette-5-light-3 u-text-1'>
                                ";
                                   
                                    GetAuthors($ArticleId);
                                    
                                echo "
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

         ";
}
}else{
    echo 'Make Something Awesome';
}


