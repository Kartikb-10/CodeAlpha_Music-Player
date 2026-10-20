

        const songs = [

            {
                title: "Song 1",
                src: "songs/song1.mp3"
            },

            {
                title: "Song 2",
                src: "songs/song2.mp3"
            },

            {
                title: "Song 3",
                src: "songs/song3.mp3"
            }

        ];

        const audio =
            document.getElementById("audio");

        const playBtn =
            document.getElementById("play");

        const prevBtn =
            document.getElementById("prev");

        const nextBtn =
            document.getElementById("next");

        const progress =
            document.getElementById("progress");

        const volume =
            document.getElementById("volume");

        const title =
            document.getElementById("songTitle");

        const playlist =
            document.getElementById("playlist");

        const currentTimeEl =
            document.getElementById("currentTime");

        const durationEl =
            document.getElementById("duration");

        let currentSong = 0;

        loadSong(currentSong);

        function loadSong(index) {

            audio.src = songs[index].src;

            title.innerText =
                songs[index].title;
        }

        playBtn.addEventListener("click", () => {

            if (audio.paused) {

                audio.play();

                playBtn.innerText = "⏸";

            } else {

                audio.pause();

                playBtn.innerText = "▶";
            }

        });

        nextBtn.addEventListener("click", () => {

            currentSong++;

            if (currentSong >= songs.length) {

                currentSong = 0;
            }

            loadSong(currentSong);

            audio.play();

            playBtn.innerText = "⏸";
        });

        prevBtn.addEventListener("click", () => {

            currentSong--;

            if (currentSong < 0) {

                currentSong =
                    songs.length - 1;
            }

            loadSong(currentSong);

            audio.play();

            playBtn.innerText = "⏸";
        });

        audio.addEventListener("timeupdate", () => {

            progress.value =
                (audio.currentTime /
                    audio.duration) * 100 || 0;

            currentTimeEl.innerText =
                formatTime(audio.currentTime);

            durationEl.innerText =
                formatTime(audio.duration);
        });

        progress.addEventListener("input", () => {

            audio.currentTime =
                (progress.value / 100)
                * audio.duration;
        });

        volume.addEventListener("input", () => {

            audio.volume =
                volume.value;
        });

        audio.addEventListener("ended", () => {

            nextBtn.click();
        });

        function formatTime(time) {

            if (isNaN(time))
                return "0:00";

            let min =
                Math.floor(time / 60);

            let sec =
                Math.floor(time % 60);

            if (sec < 10)
                sec = "0" + sec;

            return min + ":" + sec;
        }

        songs.forEach((song, index) => {

            const li =
                document.createElement("li");

            li.innerText =
                song.title;

            li.addEventListener("click", () => {

                currentSong = index;

                loadSong(currentSong);

                audio.play();

                playBtn.innerText = "⏸";
            });

            playlist.appendChild(li);
        });

 