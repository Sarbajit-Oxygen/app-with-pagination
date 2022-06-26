import React, { useEffect, useState} from "react";

import "./App.css";


const MovieCard = ({data}) => {
    const {originalTitle, startYear, runtimeMinutes, genres} = data;
    return (
        <div className="card" style={{width: '20rem'}}>
            <div className="card-body">
                <h5 className="card-title">{originalTitle}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Year : {startYear} - {runtimeMinutes} mins</h6>
                <div className="card-text">
                    Genres : { genres.split(',').map( (each, idx) => (
                        <span className="badge bg-secondary" key={idx}>{each}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}

const App = ({...props}) => {

    const [totalMovieList, setMovieList] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const goToPrev = _ => {
        // console.log(totalMovieList.length);

        if (page>1) setPage(pre => pre-1);
        else console.log("this is the first page");
    }
    const goToNext = _ => {
        // console.log(totalMovieList.length);

        if (page<(totalMovieList.length)/limit) setPage(pre => pre+1);
        else console.log("this is the last page");
    }

    const handleLimitChange = event => {
        if (event.target.value>0) { setLimit(event.target.value); setPage(1); }
    }

    useEffect(
        ()=>{
            fetch("http://localhost:3000/movies")
            .then(resp => {
                console.log(`Response status : ${resp.status}`);
                return resp.json();
            })
            .then( data => {
                setMovieList(data);
            })
        },
        []
    )
    const renderMovieList = _ => (
        <div>
                <div className="grid-box">
                    {
                        totalMovieList.slice((page-1)*limit, page*limit).map(movie => (
                            <MovieCard key={movie.id} data={movie} className="grid-item" />
                        ))
                    }
                </div>
        </div>
    )

    const pageButtons = _ => {
        const noOfPages = Math.ceil(totalMovieList.length/limit);
        console.log(`No of pages ${noOfPages}`);
        let buttons = []
        for(let i=1;i<=noOfPages;i++) {
            buttons.push((
                <a href='#' key={i} onClick={()=>setPage(i)} className={page===i ? "active" : ""}>{i}</a>
            ));
        }
        // console.log(buttons);
        return buttons;
    }
    return (
        <div>
            Limit: <input type="number" value={limit} onChange={handleLimitChange} />
            Page : {pageButtons()}  <br/>
            {renderMovieList()}
            <br/>
            <button className='btn btn-primary' onClick={goToPrev}>prev</button>
            <button className='btn btn-primary' onClick={goToNext} style={{marginLeft:'5px'}}>next</button>
        </div>
    )
}

export default App;