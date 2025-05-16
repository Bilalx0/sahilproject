import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { X } from 'lucide-react';
import sharelogo from '../assests/Share Icon_1.svg';
import sharelogoHover from '../assests/Share Icon White.svg';
import { useCurrency } from '../context/CurrencyContext';

const MansionCard = ({ property, mansion, onShare, searchQuery }) => {
  const navigate = useNavigate();
  const { currency, convertPrice } = useCurrency(); // Use CurrencyContext
  const FALLBACK_IMAGE = '/images/fallback.jpg';
  const [isShareHovered, setIsShareHovered] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Use property if available, otherwise fall back to mansion
  const data = property || mansion;

  // Guard clause: return null if no data is provided
  if (!data) {
    console.error('MansionCard received neither property nor mansion:', {
      property,
      mansion,
    });
    return null;
  }

  const handleCardClick = () => {
    navigate(`/mansion/${data.reference || 'unknown'}`);
  };

  const handleShareClick = () => {
    setShareModalOpen(true);
    if (onShare) onShare();
  };

  const getShareUrl = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/property/${data.reference || 'unknown'}`;
  };

  const encodeShareText = () => {
    const convertedPrice = convertPrice(data.price || 0); // Convert price for sharing
    const baseText = `Check out this property: ${data.title || 'N/A'} - ${currency} ${convertedPrice} in ${data.community || 'N/A'}, ${data.country || 'N/A'}`;
    if (data.propertytype === 'Luxury Collectibles') {
      return encodeURIComponent(baseText);
    }
    return encodeURIComponent(
      `${baseText} | ${data.bedrooms || 0} Beds | ${data.bathrooms || 0} Baths | ${data.size || 0} sqft`
    );
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareToInstagram = () => {
    navigator.clipboard.writeText(getShareUrl());
    alert('Instagram sharing is not directly supported. Link copied to clipboard for sharing!');
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(getShareUrl())}&title=${encodeShareText()}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(getShareUrl())}&text=${encodeShareText()}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareToWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeShareText()}%20${encodeURIComponent(getShareUrl())}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Highlight matched search terms
  const highlightText = (text, query) => {
    if (!query || !text) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  const isLuxuryCollectible = data.propertytype === 'Luxury Collectibles';

  // Determine the location text to display
  let locationText = '';
  if (isLuxuryCollectible) {
    const community = data.community || data.location || 'N/A';
    const country = data.country || 'N/A';
    locationText = community !== 'N/A' || country !== 'N/A' ? `${community}, ${country}` : 'Location unavailable';
  } else {
    locationText = `${data.community || 'N/A'}, ${data.subcommunity || 'N/A'}, ${data.country || 'N/A'}`;
  }

  const fallbackText =
    isLuxuryCollectible && locationText === 'Location unavailable'
      ? data.category || data.description || 'Luxury Item'
      : null;

  return (
    <div className="bg-white overflow-hidden relative">
      <div className="relative">
        <img
          src={data.images?.[0] || data.image || FALLBACK_IMAGE}
          alt={data.title || 'Property'}
          className="w-[100%] h-96 object-cover"
        />
        {data.tag === 'Featured' && (
          <span className="absolute top-2 left-2 bg-white text-black px-2 py-1 text-xs uppercase font-bold rounded-none">
            {data.tag}
          </span>
        )}
        <button
          onClick={handleShareClick}
          onMouseEnter={() => setIsShareHovered(true)}
          onMouseLeave={() => setIsShareHovered(false)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-[#00603A] transition-all duration-300"
        >
          <img
            src={isShareHovered ? sharelogoHover : sharelogo}
            alt="Share"
            className="w-3 h-3"
          />
        </button>
      </div>
      <div
        className="flex flex-col justify-between py-2 cursor-pointer"
        onClick={handleCardClick}
      >
        <div>
          <p
            className="text-lg font-bold text-gray-800"
            dangerouslySetInnerHTML={{
              __html: highlightText(`${currency} ${convertPrice(data.price || 0)}`, searchQuery),
            }}
          />
          {!isLuxuryCollectible && (
            <p
              className="text-sm text-gray-600 mt-1"
              dangerouslySetInnerHTML={{
                __html: highlightText(
                  `${data.bedrooms || 0} Beds | ${data.bathrooms || 0} Baths | ${data.size || 0} sqft`,
                  searchQuery
                ),
              }}
            />
          )}
          <p
            className="text-sm text-gray-600 mt-1"
            dangerouslySetInnerHTML={{
              __html: highlightText(data.propertytype || 'N/A', searchQuery),
            }}
          />
          <p
            className="text-sm text-gray-600 mt-1 line-clamp-1"
            dangerouslySetInnerHTML={{
              __html: highlightText(fallbackText || locationText, searchQuery),
            }}
          />
        </div>
      </div>
      {shareModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white shadow-lg max-w-md w-full">
            <div className="relative">
              <button
                onClick={() => setShareModalOpen(false)}
                className="absolute -top-8 right-2 p-1"
              >
                <X size={22} />
              </button>
              <div className="relative w-full h-64">
                <img
                  src={data.images?.[0] || data.image || FALLBACK_IMAGE}
                  alt={data.title || 'Property'}
                  className="w-full h-full object-cover mt-8"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/55 to-transparent"></div>
                <div className="absolute top-4 left-4 text-white">
                  <h2 className="text-2xl text-left font-playfair">{data.title || 'N/A'}</h2>
                </div>
              </div>
            </div>
            <div className="p-5 text-left">
              <h3 className="text-lg font-semibold">Share</h3>
              <p className="text-gray-600 mt-2">
                {data.subtitle ||
                  `Check out this amazing ${data.propertytype?.toLowerCase() || 'property'}!`}
              </p>
              <div className="flex justify-left space-x-4 mt-4">
                <button
                  onClick={shareToFacebook}
                  className="p-2 bg-gray-200 rounded-full hover:bg-[#00603A] hover:text-white transition-colors"
                  aria-label="Share on Facebook"
                >
                  <FaFacebook size={20} />
                </button>
                <button
                  onClick={shareToInstagram}
                  className="p-2 bg-gray-200 rounded-full hover:bg-[#00603A] hover:text-white transition-colors"
                  aria-label="Share on Instagram"
                >
                  <FaInstagram size={20} />
                </button>
                <button
                  onClick={shareToLinkedIn}
                  className="p-2 bg-gray-200 rounded-full hover:bg-[#00603A] hover:text-white transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <FaLinkedin size={20} />
                </button>
                <button
                  onClick={shareToTwitter}
                  className="p-2 bg-gray-200 rounded-full hover:bg-[#00603A] hover:text-white transition-colors"
                  aria-label="Share on Twitter"
                >
                  <FaTwitter size={20} />
                </button>
                <button
                  onClick={shareToWhatsApp}
                  className="p-2 bg-gray-200 rounded-full hover:bg-[#00603A] hover:text-white transition-colors"
                  aria-label="Share on WhatsApp"
                >
                  <FaWhatsapp size={20} />
                </button>
              </div>
            </div>
            <div className="bg-[#00603A] h-4"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MansionCard;