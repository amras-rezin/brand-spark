import { useState } from 'react';
import { PlusCircle, Play, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VideoGallery = () => {
  const navigate = useNavigate()
  const [videos, setVideos] = useState([
    { id: 1, thumbnail: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', selected: true},
    { id: 2, thumbnail: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', selected: false },
    { id: 3, thumbnail: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', selected: false},
  ]);
  
  const [playingVideo, setPlayingVideo] = useState(null);

  const handleSelectVideo = (videoId) => {
    setVideos(videos.map(video => ({
      ...video,
      selected: video.id === videoId
    })));
  };

  const handleWatchVideo = (video) => {
    setPlayingVideo(video);
  };

  const handleCloseVideo = () => {
    setPlayingVideo(null);
  };

  return (
    <div className="p-6 mx-auto bg-neutral-900 min-h-screen min-w-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl text-white flex flex-row font-sans"><span><img src="/logo.png" className='w-10 h-10 mr-2' alt="" /></span>Video Gallery</h2>
        <button
          onClick={()=>navigate('/admin/add-video')}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          Add Video
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className={`relative group rounded-lg overflow-hidden transition-all bg-gray-800 ${
              video.selected 
                ? 'ring-2 ring-blue-500' 
                : 'hover:ring-2 hover:ring-gray-600'
            }`}
          >
            <div 
              className="relative aspect-video cursor-pointer"
              onClick={() => handleSelectVideo(video.id)}
            >
              <video
                src={video.thumbnail}
                alt='video'
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center">
                {video.selected ? (
                  <Check className="w-12 h-12 text-blue-500" />
                ) : (
                  <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            </div>
            <button
              onClick={() => handleWatchVideo(video)}
              className="w-full bg-blue-600 text-white py-2 rounded-t-none hover:bg-blue-700 transition-colors"
            >
              Watch Now
            </button>
          </div>
        ))}
      </div>

      {videos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No videos added yet. Click the Add Video button to get started.</p>
        </div>
      )}

      {/* Video Player Modal */}
      {playingVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl bg-gray-900 rounded-lg overflow-hidden">
            <button
              onClick={handleCloseVideo}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <video
              src={playingVideo.thumbnail}
              className="w-full aspect-video"
              controls
              autoPlay
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;