import { useEffect, useState } from 'react';
import { PlusCircle, Play, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { axiosAdmin } from '../../../axios/axiosAdmin';
import { toast } from 'react-toastify';

const BUCKET = import.meta.env.VITE_AWS_S3_BUCKET;
const REGION = import.meta.env.VITE_AWS_S3_REGION;

const VideoGallery = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playingVideo, setPlayingVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axiosAdmin().get('/getVideo');
        setVideos(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const handleSelectVideo = async (videoId) => {
    try {
      const { data } = await axiosAdmin().post(`/selectVideo/${videoId}`);
      if (data.message === 'success') {
        setVideos(
          videos.map((video) => ({
            ...video,
            selected: video._id === videoId,
          }))
        );
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
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
        <h2 className="text-2xl text-white flex flex-row font-sans">
          <span>
            <img src="/logo.png" className="w-10 h-10 mr-2" alt="" />
          </span>
          Video Gallery
        </h2>
        <button
          onClick={() => navigate('/admin/add-video')}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:scale-105 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          Add Video
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-800 rounded-lg overflow-hidden"
            >
              <div className="aspect-video bg-gray-700"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <div
              key={video._id}
              className={`relative group rounded-lg overflow-hidden transition-all bg-gray-800 ${
                video.selected
                  ? 'ring-2 ring-blue-500'
                  : 'hover:ring-2 hover:ring-gray-600'
              }`}
            >
              <div
                className="relative aspect-video cursor-pointer"
                onClick={() => handleSelectVideo(video._id)}
              >
                <video
                  src={`https://${BUCKET}.s3.${REGION}.amazonaws.com/${video.filePath}`}
                  alt="video"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center">
                  {video.selected ? (
                    <Check className="w-12 h-12 text-white" />
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
      )}

      {videos.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-400">
            No videos added yet. Click the Add Video button to get started.
          </p>
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
              src={`https://${BUCKET}.s3.${REGION}.amazonaws.com/${playingVideo.filePath}`}
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
