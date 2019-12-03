'use strict';

function initPage(){ 
    loadProjs(); 
    renderSite();
}

function renderSite() {
    renderModal();
    renderProjs();
}

function renderProjs() {
    var projs = getProjsToRender();
    
    var divs = projs.map(function(proj) { 
        gCurrModal = proj.id;
        return `<div class="col-md-4 col-sm-6 portfolio-item"> 
                    <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${proj.id}"> 
                        <div class="portfolio-hover"> 
                            <div class="portfolio-hover-content"> 
                                <i class="fa fa-plus fa-3x"></i> 
                            </div>
                        </div>
                        <img class="img-fluid my-img-fluid" src="img/portfolio/${proj.id}-thumbnail.jpg" width="300px" max-height="200px">
                    </a>
                    <div class="portfolio-caption"> 
                        <h4>${proj.name}</h4>
                        <p class="text-muted">${proj.title}</p>
                    </div>
                </div>\n`
    })

    $('.projs-container').html(divs.join(''));
}

function renderModal() {
 var projs = getProjsToRender();
    
 var divs = projs.map(function(proj){
    var labels = proj.labels;
    
    return `<div class="portfolio-modal modal fade" id="portfolioModal${proj.id}" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="close-modal" data-dismiss="modal">
            <div class="lr">
                <div class="rl"></div>
            </div>
            </div>
            <div class="container">
            <div class="row">
                <div class="col-lg-8 mx-auto">
                <div class="modal-body">
                    <!-- Project Details Go Here -->
                    <h2>${proj.name}</h2>
                    <p class="item-intro text-muted">${proj.title}</p>
                    <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.id}-thumbnail.jpg" alt="${proj.id}">
                    <p>${proj.desc}</p>
                    <ul class="list-inline">
                        <li>
            <span class="badge badge-info">${labels}</span>
                        </li>
                        <li>Created Date: ${proj.publishedAt}</li>
                         <li>
                            <a class="checkItOutLink" href='./${proj.url}' target="_blank">Check it Out</a>
                        </li>
                    </ul>
                    <button class="btn btn-primary" data-dismiss="modal" type="button">
                        <i class="fa fa-times"></i>
                        Close Project</button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>\n`
    }); 
    $('.modals-container').html(divs.join(''));
}

function onSumbitForm() {
    var emailVal = $('#emailInput').val();
    var subjectVal = $('#subjectInput').val();
    var msgBodyVal = $('#msgBodyInput').val();
    sumbitForm(emailVal,subjectVal,msgBodyVal);
    
    $('#emailInput').val('');
    $('#subjectInput').val('');
    $('#msgBodyInput').val('');
    openCanvas();
}

