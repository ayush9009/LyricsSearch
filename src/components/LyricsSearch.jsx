import React, { useState } from 'react';
import Axios from 'axios';
import './LyricsSearch.css';

function LyricsSearch({url}) {
    const [artist,setArtist]=useState('');
    const [song,setSong]=useState('');
    const [lyrics,setLyrics]=useState('');
    const [error,setError]=useState('');


    const searchLyrics=async(event)=>{
        event.preventDefault();  //stop the default behiavior of submitting the form
        if(!artist === '' || song ===''){
            return;
        }
        setLyrics('');
        setError('');
        try{
            const response = await Axios.get(`${url}/${artist}/${song}`);
            console.log(response);
            setLyrics(response.data.lyrics);
        }catch(err){
            console.error(err);
            setError(err.message);
        }
    }
  return (
    <div className="search-container">
        <h2>Lyrics Search</h2>
        <form onSubmit={searchLyrics}>
            <input 
            type="text" 
            placeholder="Artist Name" 
            value={artist} 
            onChange={(e)=>{
                setArtist(e.target.value);
            }}
            required/>
            <input 
            type="text" 
            placeholder="Song Name" 
            value={song}
            onChange={(e)=>{
                setSong(e.target.value);
            }}
            required/>
            <button type='submit'>Search</button>
        </form>
        <hr/>
        {error && (<h2 className='error'>No Lyrics Found</h2> )}
        <pre>{lyrics}</pre>
        {/* text in a pre element is displayed in a fixed width font and it preserves both spaces and line breaks */}
    </div>
  )
}

export default LyricsSearch

