// Virtual Band - Main JavaScript - RTL Support

document.addEventListener('DOMContentLoaded', function() {
    // Check if page is RTL
    const isRTL = document.documentElement.dir === 'rtl';
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');

            // Animate hamburger menu
            const spans = menuToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close mobile menu when clicking on a link
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    const spans = menuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }

    // Smooth scroll for banner buttons
    const bannerButtons = document.querySelectorAll('.banner-btn');
    bannerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // If it's a hash link, enable smooth scrolling
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and fade-in elements
    const fadeElements = document.querySelectorAll('.card, .fade-in');
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(element);
    });

    // Parallax effect for banner sections
    let ticking = false;

    function updateParallax() {
        const banners = document.querySelectorAll('.banner');
        const scrolled = window.pageYOffset;

        banners.forEach(banner => {
            const rect = banner.getBoundingClientRect();
            const bannerTop = rect.top + scrolled;
            const bannerHeight = banner.offsetHeight;

            // Only apply parallax if banner is in viewport
            if (scrolled + window.innerHeight > bannerTop && scrolled < bannerTop + bannerHeight) {
                const speed = 0.5;
                const yPos = -(scrolled - bannerTop) * speed;
                const content = banner.querySelector('.banner-content');
                if (content) {
                    content.style.transform = `translateY(${yPos}px)`;
                }
            }
        });

        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Header background on scroll
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 217, 255, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Card hover sound effect (optional - can be removed if no sound files)
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Add glow effect to buttons on hover
    const buttons = document.querySelectorAll('.banner-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.5)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });

    // Dynamic page title based on scroll position (for index page)
    if (document.querySelector('.banner')) {
        let currentBanner = 1;

        window.addEventListener('scroll', function() {
            const banners = document.querySelectorAll('.banner');
            const scrollPosition = window.pageYOffset + (window.innerHeight / 2);

            banners.forEach((banner, index) => {
                const bannerTop = banner.offsetTop;
                const bannerBottom = bannerTop + banner.offsetHeight;

                if (scrollPosition >= bannerTop && scrollPosition < bannerBottom) {
                    if (currentBanner !== index + 1) {
                        currentBanner = index + 1;
                        // Could trigger additional effects here
                    }
                }
            });
        });
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);

        if (konamiCode.join('').includes(konamiSequence.join(''))) {
            activateEasterEgg();
            konamiCode = [];
        }
    });

    function activateEasterEgg() {
        // Add special effect when Konami code is entered
        document.body.style.animation = 'rainbow 2s linear infinite';

        // Create style for rainbow animation if it doesn't exist
        if (!document.getElementById('rainbow-style')) {
            const style = document.createElement('style');
            style.id = 'rainbow-style';
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        // Show message
        const message = document.createElement('div');
        // Check if page is RTL for Persian message
        const isPageRTL = document.documentElement.dir === 'rtl';
        message.textContent = isPageRTL ? '🎉 حالت مجازی فعال شد! 🎉' : '🎉 Virtual Mode Activated! 🎉';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, var(--accent-color), var(--accent-secondary));
            padding: 2rem 4rem;
            font-size: 2rem;
            font-weight: bold;
            border-radius: 10px;
            z-index: 10000;
            animation: fadeIn 0.5s ease;
            direction: ${isPageRTL ? 'rtl' : 'ltr'};
        `;
        document.body.appendChild(message);

        setTimeout(() => {
            message.remove();
            document.body.style.animation = 'none';
        }, 3000);
    }

    // Add active state to current page navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');

    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            item.style.color = 'var(--accent-color)';
        }
    });

    // Console messages in Persian for RTL pages
    if (isRTL) {
        console.log('🎵 وبسایت مدهوش با موفقیت بارگذاری شد 🎵');
        console.log('💫 بُعد دیجیتال را کاوش کنید...');
    } else {
        console.log('🎵 Virtual Band Website Loaded Successfully 🎵');
        console.log('💫 Explore the digital dimension...');
    }

    // ==================== MUSIC PLAYER ====================

    // Playlist data - REPLACE THESE WITH YOUR ACTUAL MUSIC FILES
    const playlist = [
        {
            title: 'گربه',
            artist: 'مدهوش',
            albumArt: 'images/Gorbeh.PNG',
            // Replace this with your actual audio file path
            src: 'music/Gorbeh.mp3',
            duration: '4:55'
        },
        {
            title: ' سفینه',
            artist: 'مدهوش',
            albumArt: 'images/Safineh_4.PNG',
            // Replace this with your actual audio file path
            src: 'music/Safineh.mp3',
            duration: '4:07'
        }
    ];

    let currentTrackIndex = 0;
    let isPlaying = false;

    // Get player elements
    const audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const trackTitle = document.getElementById('trackTitle');
    const trackArtist = document.getElementById('trackArtist');
    const albumArt = document.getElementById('albumArt');
    const playlistBtn = document.getElementById('playlistBtn');
    const playlistEl = document.getElementById('playlist');
    const closePlaylistBtn = document.getElementById('closePlaylist');
    const playlistItems = document.getElementById('playlistItems');
    const volumeBtn = document.getElementById('volumeBtn');
    const volumeBar = document.querySelector('.volume-bar');
    const volumeFill = document.getElementById('volumeFill');

    // Check if all elements exist
    if (!audioPlayer || !playBtn || !playlistBtn) {
        console.error('Music player elements not found!');
        return;
    }

    console.log('Music player initialized with', playlist.length, 'tracks');

    // Initialize player
    function init() {
        loadTrack(currentTrackIndex);
        renderPlaylist();
    }

    // Load track
    function loadTrack(index) {
        const track = playlist[index];
        console.log('Loading track:', track.title);
        audioPlayer.src = track.src;
        audioPlayer.currentTime = 0;  // Reset to start
        trackTitle.textContent = track.title;
        trackArtist.textContent = track.artist;
        albumArt.querySelector('img').src = track.albumArt;

        // Reset progress
        progress.style.width = '0%';
        currentTimeEl.textContent = '0:00';
    }

    // Play/Pause
    function togglePlay() {
        console.log('Toggle play clicked, isPlaying:', isPlaying);
        if (isPlaying) {
            audioPlayer.pause();
            playBtn.querySelector('i').classList.replace('fa-pause', 'fa-play');
            isPlaying = false;
        } else {
            const playPromise = audioPlayer.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log('Playback started successfully');
                        playBtn.querySelector('i').classList.replace('fa-play', 'fa-pause');
                        isPlaying = true;
                    })
                    .catch(error => {
                        console.error('Playback failed:', error);
                        alert('خطا در پخش موسیقی. لطفا دوباره تلاش کنید.');
                    });
            }
        }
    }

    // Previous track
    function previousTrack() {
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrackIndex);
        if (isPlaying) {
            audioPlayer.play();
        }
        updatePlaylistUI();
    }

    // Next track
    function nextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
        if (isPlaying) {
            audioPlayer.play();
        }
        updatePlaylistUI();
    }

    // Update progress bar
    audioPlayer.addEventListener('timeupdate', () => {
        if (audioPlayer.duration) {
            const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progress.style.width = progressPercent + '%';

            // Update current time
            currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
        }
    });

    // Update duration when metadata loads
    audioPlayer.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audioPlayer.duration);
    });

    // Seek functionality
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percentage = clickX / width;
        audioPlayer.currentTime = percentage * audioPlayer.duration;
    });

    // Auto play next track
    audioPlayer.addEventListener('ended', () => {
        nextTrack();
    });

    // Volume control
    volumeBar.addEventListener('click', (e) => {
        const rect = volumeBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percentage = clickX / width;
        audioPlayer.volume = percentage;
        volumeFill.style.width = (percentage * 100) + '%';

        // Update volume icon
        updateVolumeIcon(percentage);
    });

    // Update volume icon based on level
    function updateVolumeIcon(volume) {
        const icon = volumeBtn.querySelector('i');
        icon.classList.remove('fa-volume-up', 'fa-volume-down', 'fa-volume-mute');

        if (volume === 0) {
            icon.classList.add('fa-volume-mute');
        } else if (volume < 0.5) {
            icon.classList.add('fa-volume-down');
        } else {
            icon.classList.add('fa-volume-up');
        }
    }

    // Mute/Unmute
    volumeBtn.addEventListener('click', () => {
        if (audioPlayer.volume > 0) {
            audioPlayer.dataset.previousVolume = audioPlayer.volume;
            audioPlayer.volume = 0;
            volumeFill.style.width = '0%';
            updateVolumeIcon(0);
        } else {
            const previousVolume = parseFloat(audioPlayer.dataset.previousVolume) || 0.7;
            audioPlayer.volume = previousVolume;
            volumeFill.style.width = (previousVolume * 100) + '%';
            updateVolumeIcon(previousVolume);
        }
    });

    // Toggle playlist
    playlistBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Playlist button clicked');
        playlistEl.classList.toggle('active');
        console.log('Playlist active:', playlistEl.classList.contains('active'));
    });

    closePlaylistBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Close playlist clicked');
        playlistEl.classList.remove('active');
    });

    // Render playlist
    function renderPlaylist() {
        playlistItems.innerHTML = '';

        playlist.forEach((track, index) => {
            const item = document.createElement('div');
            item.className = 'playlist-item' + (index === currentTrackIndex ? ' active' : '');
            item.innerHTML = `
                <div class="playlist-item-art">
                    <img src="${track.albumArt}" alt="${track.title}">
                </div>
                <div class="playlist-item-info">
                    <div class="playlist-item-title">${track.title}</div>
                    <div class="playlist-item-artist">${track.artist}</div>
                </div>
                <div class="playlist-item-duration">${track.duration}</div>
            `;

            item.addEventListener('click', () => {
                currentTrackIndex = index;
                loadTrack(currentTrackIndex);
                if (isPlaying) {
                    audioPlayer.play();
                } else {
                    togglePlay();
                }
                updatePlaylistUI();
            });

            playlistItems.appendChild(item);
        });
    }

    // Update playlist UI
    function updatePlaylistUI() {
        const items = playlistItems.querySelectorAll('.playlist-item');
        items.forEach((item, index) => {
            if (index === currentTrackIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Format time (seconds to mm:ss)
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }

    // Event listeners
    console.log('Adding event listeners...');
    playBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Play button clicked!');
        togglePlay();
    });
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Previous button clicked!');
        previousTrack();
    });
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Next button clicked!');
        nextTrack();
    });

    // Initialize
    console.log('Initializing player...');
    init();

    // Log player initialization
    if (isRTL) {
        console.log('🎧 پخش‌کننده موسیقی آماده است!');
    } else {
        console.log('🎧 Music player initialized!');
    }
    console.log('Playlist loaded:', playlist);
});
