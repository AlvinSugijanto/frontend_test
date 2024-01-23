import axios from 'axios';
import { useEffect, useState } from 'react'

type PlaylistType = {
  id: string,
  artist: string,
  title: string
}


function App() {

  const [playlistData, setPlaylistData] = useState<PlaylistType[]>([]);
  const [currentSong, setCurrentSong] = useState<PlaylistType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://emos-frontend-techtest.vercel.app/api/playlist");

        setPlaylistData(response.data.data);

        const random = Math.floor(Math.random() * response.data.data.length);
        setCurrentSong(response.data.data[random]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])

  const handleChangeSong = (data: PlaylistType) => {
    setCurrentSong(data);
  }

  const handleClickedNext = () => {
    const findIndex = playlistData.findIndex((element) => element.id === currentSong?.id);
    if (findIndex == playlistData.length - 1) {
      setCurrentSong(playlistData[0]);
    } else {
      setCurrentSong(playlistData[findIndex + 1]);
    }
  }

  const handleClickedPrevious = () => {
    const findIndex = playlistData.findIndex((element) => element.id === currentSong?.id);
    if (findIndex == 0) {
      setCurrentSong(playlistData[playlistData.length - 1]);
    } else {
      setCurrentSong(playlistData[findIndex - 1]);
    }
  }

  const handleShuffleSong = () => {
    const findIndex = playlistData.findIndex((element) => element.id === currentSong?.id);
    if (findIndex !== -1) {
      let random = Math.floor(Math.random() * playlistData.length);

      while (random == findIndex) {
        random = Math.floor(Math.random() * playlistData.length);
      }

      setCurrentSong(playlistData[random]);
    }
  }


  return (
    <>
      <div className='min-h-screen flex justify-center bg-slate-100'>
        <div className='border-2 py-4 bg-white min-w-[400px]'>
          <p className='font-semibold text-lg text-center'>Now Playing</p>
          <div className='flex justify-between gap-8 py-2 px-6 bg-[#DBEAFE] mt-4 items-center'>
            <button onClick={handleClickedPrevious} className='text-sky-700 font-semibold hover:text-sky-900'>Prev</button>
            <div>
              <p className='text-center text-sky-600 hover:text-sky-900 font-bold'>{currentSong?.title}</p>
              <p className=' text-center text-sky-600 hover:text-sky-900 font-semibold'>{currentSong?.artist}</p>
            </div>
            <button onClick={handleClickedNext} className='text-sky-700 font-semibold hover:text-sky-900'>Next</button>
          </div>
          <div className="flex justify-end px-4 mt-4">
            <button className='text-lg font-semibold text-sky-600' onClick={handleShuffleSong}>Shuffle Song</button>
          </div>
          {playlistData.map((data) => (
            <div className='flex p-4 items-center gap-10 border-b' key={data.id}>
              <button onClick={() => handleChangeSong(data)} className='border rounded-md px-2 py-1 bg-sky-500 text-white'>Play</button>
              <div>
                <p className='font-semibold'>{data.title}</p>
                <p >{data.artist}</p>
              </div>
            </div>
          ))}

          {/* <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Artist</th>
              </tr>
            </thead>
            <tbody>
              {playlistData.map((data) => (
                <tr>
                  <th><button onClick={() => handleChangeSong(data)} className='border rounded-md px-2 py-4 bg-sky-500 text-white'>Play</button></th>
                  <td><p className='font-semibold text-center'>{data.title}</p></td>
                  <td><p className='text-center'>{data.artist}</p></td>
                </tr>
              ))};
            </tbody>
          </table> */}
        </div>
      </div>
    </>
  )
}

export default App
