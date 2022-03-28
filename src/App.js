import React, {useEffect, useState} from "react";
import Tmdb from "./Tmdb";
import './App.css'
import MovieRow from "./components/MovieRow";
import FeatureMovie from "./components/FeatureMovie";
import Header from "./components/Header";

export default () => {

  const [movieList, setMovieList]= useState([]);
  const [featureData,setfeatureData]=useState(null);
  const [blackHeader,setBlackHeader]=useState(false);

  useEffect(()=>{
    const loadAll = async ()=> {
      //pegano lista TOTAL
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Pegar o Feature
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].itens.results.length));
      let chosen = originals[0].itens.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setfeatureData(chosenInfo)
    }
    loadAll()
  }, []);

  useEffect(()=>{
    const scrollListener = ()=>{
      if(window.scrollY > 10){
        setBlackHeader(true)
      } else{
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener);

    return()=>{
      window.remove.EventListener('scroll', scrollListener);

    }
  }, [])
  
  return (
    <div className="page">

      <Header black={blackHeader}/>  
    {featureData &&
    <FeatureMovie item={featureData}/>
    }

      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title = {item.title} items={item.itens}/>
        ))}
      </section>
      <footer>
        Feito com dedicação por AD12<br/>
        Direitos de imagem para Netflix<br/>
        Dados pegos do site The moviedb.org
      </footer>

      {movieList >= 0 &&
      <div className="loading">
        <img src="https://cms.qz.com/wp-content/uploads/2016/09/loading.gif?quality=75&strip=all&w=410&h=231" alt="carregando" />
      </div>
      }
    </div>
  )
}