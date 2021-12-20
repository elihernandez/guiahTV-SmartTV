var dataMovie = new Object(),
    classFocusItem,
    continueWatching;
    
function renderCatalogo(data, idList, idCatalogue, focusItem, catContinue){
    classFocusItem = focusItem;
    continueWatching = catContinue;
    var element = (
        <div id={idList} className="list">
            {renderCategories(data, idCatalogue)}
        </div>
    );

    const catalogue = document.getElementById(idCatalogue);	
    ReactDOM.render(element, catalogue);
}

function renderCategories(data, idCatalogue){
    const categorias = data.map((category, index) =>
        Category(category, index, data, idCatalogue)
    );
    return categorias;
}

function mouseOverCategory(e){
    // console.log(e.currentTarget)
    var idCategory = e.currentTarget.id;
    var idList = e.currentTarget.childNodes[1];
    // console.log(e.currentTarget.offsetWidth)
    // console.log( e.currentTarget.childNodes[1].offsetWidth)
}

function Category(category, index, data, idCatalogue){
    var categoria = '';
    dataMovie['category'] = category;
    dataMovie['category']['section'] = idCatalogue.replace("catalogo-", "");
    dataMovie['category']['id'] = idCatalogue+"-category-"+index;
    dataMovie['category']['headerId'] = idCatalogue+"-header-category-"+index;
    dataMovie['category']['countId'] = idCatalogue+"count-header-category-"+index;
    dataMovie['category']['listId'] =idCatalogue+ "-list-"+index;
    dataMovie['category']['index'] = index;
    dataMovie['category']['firstIndex'] = 0;
    dataMovie['category']['lastIndex'] = data.length - 1;
    var leftDirectionId = "left-arrrow-direction-"+dataMovie.category.listId;
    var rightDirectionId = "right-arrrow-direction-"+dataMovie.category.listId;
    if(dataMovie.category.poster_type == 0){
        var currentRow = 1;
        var numRows = (category.cmData.length) / 8;
        if(numRows > 0){
            if(Number.isInteger(numRows)){
                numRows = numRows;
            }else{
                numRows = Math.trunc(numRows) + 1;
            }
        }else{
            numRows = Math.trunc(numRows);
        }
        categoria = (
            <ul key={dataMovie.category.headerId} id={dataMovie.category.headerId} className="portrait" onMouseOver={mouseOverCategory}>
                <div id={dataMovie.category.headerheaderId} className="header-category el-row ai-center ac-center">
                    <h3 className="name-category">{dataMovie.category.category}</h3>
                    <div id={dataMovie.category.countId}>
                        <h3 className="fs-2">(1 de {dataMovie.category.cmData.length})</h3>
                    </div>
                </div>
                <div id={dataMovie.category.listId} className="movies">
                    {renderMovies(dataMovie, idCatalogue, category)}
                </div>
                <ArrowsRows leftDirectionId={leftDirectionId} rightDirectionId={rightDirectionId} numRows={numRows} listId={dataMovie.category.listId} />
            </ul>
        );
    }
        
    if(dataMovie.category.poster_type == 1){
        var currentRow = 1;
        let numItems = 0;
        if (idCatalogue.includes('radio')){
            numItems = 4;
        }else{
            numItems = 5;
        }

        var numRows = (category.cmData.length) / numItems;
        if(numRows > 1){
            if(Number.isInteger(numRows)){
                numRows = numRows;
            }else{
                numRows = Math.trunc(numRows) + 1;
            }
        }else{
            numRows = Math.trunc(numRows);
        }
        categoria = (
            <ul key={dataMovie.category.headerId} id={dataMovie.category.headerId} className="landscape">
                <div className="header-category" className="header-category el-row ai-center ac-center">
                    <h3 className="name-category">{dataMovie.category.category}</h3>
                    <div id={dataMovie.category.countId}>
                        <h3 className="fs-2">(1 de {dataMovie.category.cmData.length})</h3>
                    </div>
                </div>
                <div id={dataMovie.category.listId} className="movies">
                    {renderMovies(dataMovie, idCatalogue, category)}
                </div>
                <ArrowsRows leftDirectionId={leftDirectionId} rightDirectionId={rightDirectionId} numRows={numRows} listId={dataMovie.category.listId} />
            </ul>
        );
    }
    // validateShowArrowsRows(leftDirectionId, rightDirectionId, numRows, currentRow);
    return categoria;
}

function ArrowsRows({leftDirectionId, rightDirectionId, numRows, listId}){ 
    var currentRow = 1;
    var displayLeft = "none";
    if(numRows == 0 || numRows == 1){
        var displayRight = "none";
    }else{
        var displayRight = "";
    }

    if(isWebBrowser()){
        return (
            <>
                <div id={leftDirectionId} className={`direction left ${listId.includes('radio') ? "radio" : ""}`} onClick={moveLeftCatalogue} rightDirectionId={rightDirectionId} leftDirectionId={leftDirectionId} currentRow={currentRow} numRows={numRows} listId={listId} style={{display: displayLeft}}><i class="fas fa-chevron-left"></i></div>
                <div id={rightDirectionId} className={`direction right ${listId.includes('radio') ? "radio" : ""}`} onClick={moveRightCatalogue} leftDirectionId={leftDirectionId} rightDirectionId={rightDirectionId} currentRow={currentRow} numRows={numRows} listId={listId} style={{display: displayRight}}><i class="fas fa-chevron-right"></i></div>
            </>
        )
    }

    return "";
}

function validateShowArrowsRows(leftDirectionId, rightDirectionId, numRows, currentRow){
    var leftDirection = document.getElementById(leftDirectionId);
    var rightDirection = document.getElementById(rightDirectionId);
    if(currentRow != numRows){
        rightDirection.style.display = "";
    }

    if(currentRow == 1){
        leftDirection.style.display = "none";
    }
}

function renderMovies(data, idCatalogue, category){
    var data2 = data.category.cmData;
    const movies = data2.map((movie, index) =>
        Movie(movie, index, idCatalogue, category)
    );
    return movies;
}

var imagesPreloadedArray = new Array();

function Movie(movie, index, idCatalogue, category){
    var pelicula = '';
    dataMovie['movie'] = movie;
    dataMovie['movie']['id'] = idCatalogue+'-category-'+dataMovie.category.index+'-movie-'+index;
    dataMovie['movie']['index'] = index;
    dataMovie['movie']['firstIndex'] = 0;
    dataMovie['movie']['lastIndex'] = dataMovie.category.cmData.length - 1;
    dataMovie['movie']['idInfoMovie'] = 'info-movie-'+idCatalogue;
    dataMovie['movie']['idBackground'] = 'background-'+idCatalogue;
    var data = escape(JSON.stringify(dataMovie));

    var imagePreloaded = new Image();
    imagePreloaded.src = movie.HdBackgroundImageUrl;
    // imagesPreloadedArray[category.index] = category;
    // imagesPreloadedArray[category.index][index] = imagePreloaded;


    if(dataMovie.category.poster_type == 0){
        if(movie.HDPosterUrlPortrait == ""){
            var img = <img src={movie.HDPosterUrl} alt=""></img>;
            // new Image().src = movie.HDPosterUrl;
        }else{
            var img = <img src={movie.HDPosterUrlPortrait} alt=""></img>;
            // new Image().src = movie.HDPosterUrl;
        }
    }
      
    if(dataMovie.category.poster_type == 1){
        if(movie.HDPosterUrlLandscape == ""){
            var img = <img src={movie.HDPosterUrl} alt=""></img>;
            // new Image().src = movie.HDPosterUrl;
        }else{
            var img = <img src={movie.HDPosterUrlLandscape} alt=""></img>;
            // new Image().src = movie.HDPosterUrl;
        }
    }

    if(index == 0){
        pelicula = (
            <li key={dataMovie.movie.id} id={dataMovie.movie.id} className={classFocusItem} tabIndex="-1" data={data} data-sn-left={'#'+dataMovie.movie.id} onKeyDown={keyDownItemCatalogue} onClick={clickItemCatalogue} onFocus={focusItemCatalogue} onMouseOver={mouseoverItemCatalogue}>
                {img}
                <div className="background-progress"></div>
                {IconProgress()}
                {ProgressBar()}
                {ButtonsRadio()}
                {LoadingRadio()}
            </li>
        );
    }else if (index == dataMovie.movie.lastIndex) {
        pelicula = (
            <li key={dataMovie.movie.id} id={dataMovie.movie.id} className={classFocusItem} tabIndex="-1" data={data} data-sn-right={'#'+dataMovie.movie.id} onKeyDown={keyDownItemCatalogue} onClick={clickItemCatalogue} onFocus={focusItemCatalogue} onMouseOver={mouseoverItemCatalogue}>
                {img}
                <div className="background-progress"></div>
                {IconProgress()}
                {ProgressBar()}
                {ButtonsRadio()}
                {LoadingRadio()}
            </li>
        );
    } else {
        pelicula = (
            <li key={dataMovie.movie.id} id={dataMovie.movie.id} className={classFocusItem} tabIndex="-1" data={data} onKeyDown={keyDownItemCatalogue} onFocus={focusItemCatalogue} onClick={clickItemCatalogue} onMouseOver={mouseoverItemCatalogue}>
                {img}
                <div className="background-progress"></div>
                {IconProgress()}
                {ProgressBar()}
                {ButtonsRadio()}
                {LoadingRadio()}
            </li>
        );
    }

    return pelicula;
}  

function ButtonsRadio(){
    if(classFocusItem == "item-radio"){
        return (
            <div className="background-buttons">
                <span className="button-play" onClick={clickButtonsRadio}><i class="far fa-play-circle"></i></span>
                <span className="button-pause" onClick={clickButtonsRadio}><i class="far fa-pause-circle"></i></span>
            </div>
        )
    }

    return "";
}

function LoadingRadio(){
    if(classFocusItem == "item-radio"){
        return (
            <div className="loader-radio" style={{display: "none"}}>
                <div className="spinner-radio"></div>
            </div>
        )
    }

    return "";
}

function IconProgress(){
    if(dataMovie.movie.ResumePos){
        return  (
                <div className="icon-continue-watching">
                    <i className="far fa-play-circle"></i>
                </div>
        );
    }
}

function ProgressBar(){
    if(dataMovie.movie.ResumePos){
        var time = getProgressMovie(dataMovie);
        return  (
            <div className="progress-continued">
                <div className="progress-total"></div>
                <div className="progress-actual" style={{width: time}}></div>
            </div>
        );
    }
}

function getProgressMovie(data){
    var position = data.movie.ResumePos/1000;
    var duration = (data.movie.Length).replace(' min', '');
    duration = parseInt(duration, 10);
    duration = duration * 60;
    var time = (position * 100) / duration;
    time = time+'%';
    return time;
}

function BackgroundCatalogue(idElement, background, data){
    // background = imagesPreloadedArray[data.category.index][data.movie.index].src;
    var element = (
        <img src={background} alt=""/>
    );

    ReactDOM.render(element, document.getElementById(idElement));
}
