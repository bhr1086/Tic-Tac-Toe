<template>
    <main class="main-min-height-100 main-game">
        <section class="section" id="tictac">
            <div class="container-fluid">
                <div class="row dashboard py-5" v-if="start">
                    <div class="col-md-9 p-0 d-md-flex flex-column align-items-center mx-auto"
                        v-if="showWaitingScreen == false">
                        <div class="game-pad container">
                            <div class="pad box-shadow-1 bg-white d-md-flex flex-column ng-star-inserted">
                                <div class="game-title">
                                    <h1 class="h3 fw-bolder text-center text-md-start"> Play Tic Tac Toe </h1>
                                </div>
                                <div class="pad-content">
                                    <div class="game-thumb"><img fetchpriority="high" src="/assets/images/thumbnail.png"
                                            alt="Play Tic Tac Toe">

                                    </div>
                                    <div class="game-actions">
                                        <a @click="generateRandomRoom()" class="mb-2 btn-links" data-toggle="modal"
                                            data-target="#playfriend">Play with a friend
                                        </a>
                                        <a @click="onePlayer" class="mb-2 btn-links" data-toggle="modal"
                                            data-target="#playrebot">Play vs robot</a>
                                        <a @click="openRoomIDModal()" class="mb-2 btn-links">Enter code to play game</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container my-5" v-if="showWaitingScreen == false">
                        <p>The Tic Tac Toe game (also called Noughts and crosses, Xs and Os, x o game, XOX Game, 3 in a
                            row) is a popular kids' game. Often played and enjoyed by adults as well. Because of its
                            simplicity, this 3-row per 3-row board game may initially seem trivial. However, Tic Tac Toe
                            involves its share of analytics and rapidity. The game is a lot of fun for players of all
                            ages and provides one with a great brain workout too!</p>
                        <h2>Tic Tac Toe rules</h2>
                        <p>To play with your friend, generate a unique code and share it with your friend. He/she can either
                            join with QR Scan, or make use of the link you shared.</p>

                        <p>The game is divided into five levels. Starting with 3x3, the game progresses to the 7x7 level if
                            no one wins 3x3, 5x5, or 6x6. </p>

                        <p>If the game draws in 7x7 as well, it will start 7x7 again, but you must play your turn within 3
                            seconds. Otherwise, the opponent will triumph. </p>

                        <p>To win at 3x3, you must get three strikes. 5x5 and 6x6 require four strikes each. In contrast,
                            7x7 takes five strikes to win the game.</p>

                        <p>If in case any of the users get disconnected, he'll have 4 chances to rejoin the game. If it
                            happens 5th time, the opponent will be declared as a winner. </p>

                        <p>You can use an avatar, username, and nickname of your own choice.</p>
                    </div>
                    <div class="container my-5" v-if="showWaitingScreen == true">
                        <div class="game-title">
                            <h1 class="h3 fw-bolder text-center text-md-start"> Please wait, creating the match </h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="col-md-9 col-lg-8  ng-tns-c165-52 mx-auto p-0" id="ticTocMain">
            <section class="section min-h-100" id="gameBoard">
                <div class="container-fluid game-container">
                    <section>
                        <div class="container-fluid game-users" v-if="waiting == false">

                            <a class="close-icon tooltips" @click=leaveRoom()>
                                <svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark"
                                    class="svg-inline--fa fa-xmark fa-2x" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 320 512">
                                    <path fill="currentColor"
                                        d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z">
                                    </path>
                                </svg>
                                <span class="tooltiptexts">Leave Room</span>
                            </a>
                            <div class="row justify-content-center">
                                <div class="col-5 d-flex align-items-center px-2">
                                    <div class="flex-grow-1 flex-shrink-1 min-width-0 d-flex flex-column  text-end">
                                        <span class="text-right username toggle-side">{{ this.auth.nick_name }}</span>
                                    </div>
                                    <div class=" mx-2">
                                        <div class="app-user-avatar medium ">
                                            <div class="img-wrapper">
                                                <img id="myTurn" alt="avatar image"
                                                    :src="'/assets/images/' + this.auth.avatar">

                                            </div>
                                            <!-- <span class="ml-1">{{level}}/6</span> -->
                                        </div>
                                        <div class="turn-sign" v-if="this.withFriend">{{ this.player[this.pcPlayer] }}
                                        </div>
                                        <div class="turn-sign" v-else>{{ huPlayer }}</div>
                                    </div>
                                </div>
                                <div class="col-2 d-flex align-items-center px-2">
                                    <div class="flex-grow-1 flex-shrink-1 min-width-0 d-flex flex-column  text-end">
                                        <span class="text-center username toggle-side">{{ level }} / 5</span>
                                    </div>
                                </div>
                                <div class="col-5 d-flex align-items-center flex-row-reverse px-2">
                                    <div class="flex-grow-1 flex-shrink-1 min-width-0 d-flex flex-column ">

                                        <span class="username cursor-pointer toggle-side">{{ this.opponent_name }}</span>
                                    </div>
                                    <div class="mx-2">
                                        <div class="app-user-avatar medium">
                                            <!-- <span class="mr-1">{{level}}/6</span> -->
                                            <div class="img-wrapper">
                                                <img class="turn-off-avatar" id="oppositeTurn" alt="avatar image"
                                                    :src="'/assets/images/' + this.opponent_avatar">

                                            </div>

                                        </div>
                                        <div class="turn-sign" v-if="this.withFriend">
                                            {{ this.player[this.pcPlayer == 1 ? 2 : 1] }}</div>
                                        <div class="turn-sign" v-else>{{ botPlayer }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section style="margin-top:-15px">
                        <div class="game-users" v-if="waiting == false"
                            style="margin-bottom: 10px;text-align:center;font-size:20px">
                            <div @click="toggleMute">
                                <span :key='muted' v-if="muted == true">
                                    <i class="fa-solid fa-volume-high"></i>
                                </span>
                                <span :key='muted' v-if="muted == false">
                                    <i class="fa-solid fa-volume-xmark"></i>
                                </span>
                            </div>
                        </div>
                    </section>
                    <div class="column has-text-centered p-0 game-point">
                        <div class="result-message-turn">
                            <div class="resultMsg is-success" v-if="haveWinner && withFriend">
                                <span class="winner-circle">({{ currentPlayer == pcPlayer ? auth.nick_name : opponent_name
                                }})</span>
                                Wins
                            </div>
                            <div class="resultMsg is-success" v-if="haveWinner && withFriend == false">
                                <span class="winner-circle">({{ currentPlayer != pcPlayer ? auth.nick_name : opponent_name
                                }})</span>
                                Wins
                            </div>
                            <div class="resultMsg is-warning" v-if="draw == true">
                                Draw!
                            </div>
                            <div class="resultMsg is-warning" style="background-color:inherit !important"
                                v-if="draw == false && haveWinner == false && run == true && withFriend == true && waiting == false">
                                {{ currentPlayer == pcPlayer ? this.auth.nick_name : opponent_name }} Turn to Play
                            </div>
                            <div class="resultMsg is-warning" style="background-color:inherit !important"
                                v-if="draw == false && haveWinner == false && currentPlayer == huPlayer && run == true && withFriend == false">
                                Your Turn to Play
                            </div>
                        </div>
                        <transition ansition name="bounce" v-if="withFriend == false">
                            <div class="container" v-if="showChoose">
                                <a class="close-icon tooltips mt-4" @click=leaveRoom()>
                                    <svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark"
                                        class="svg-inline--fa fa-xmark fa-2x" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 320 512">
                                        <path fill="currentColor"
                                            d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z">
                                        </path>
                                    </svg>
                                    <span class="tooltiptexts">Leave Room</span>
                                </a>
                                <div class="choose-symbol">
                                    <h4 class="subtitle">Player 1 choose your symbol</h4>
                                    <a class="button is-outlined" @click="setPlayerOne(1), startGame()">O</a>
                                    <a class="button is-outlined" @click="setPlayerOne(2), startGame()">X</a>
                                </div>
                            </div>
                        </transition>
                        <transition name="bounce" v-else>
                            <div class="container" v-if="showChoose">
                                <a class="close-icon tooltips mt-4" @click=leaveRoom()>
                                    <svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark"
                                        class="svg-inline--fa fa-xmark fa-2x" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 320 512">
                                        <path fill="currentColor"
                                            d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z">
                                        </path>
                                    </svg>
                                    <span class="tooltiptexts">Leave Room</span>
                                </a>
                                <div class="choose-symbol">
                                    <h4 class="subtitle">Player 1 choose your simbol</h4>
                                    <a class="button is-outlined" @click="setPlayerOne(1)">O</a>
                                    <a class="button is-outlined" @click="setPlayerOne(2)">X</a>
                                </div>
                            </div>
                        </transition>
                        <div v-if="showNextLevelTimer" class="countdown-no">{{ nextLevelTimer }}</div>
                        <div v-if="showLastLevelTimer && level == 5 && draw == false && winner == false"
                            class="countdown-no">{{ lastLevelTimer }}</div>
                        <div v-if="startPauseTimer" class="turn-symbol">{{ opponent_name }} disconnected waiting to
                            rejoin with in <br /> {{ startPauseTimerCount }}</div>
                        <div v-if="showCountdown" class="countdown-no">{{ countdown }}</div>
                        <div v-if="level == 1 && showCountdown == false">
                            <transition name="bounce" v-if="withFriend == false">
                                <div class="container game-p p-0" id="guru-disable">
                                    <div class="turn-symbol" v-if="run">
                                        3 strikes to win a game
                                    </div>
                                    <!-- <div :class="(currentPlayer != pcPlayer && auth.isGuru !=1) ? 'enable-board' : 'disable-board'" class="board has-text-centered columns is-multiline is-mobile game-tictactoe game-three-by-three my-0" v-if="run" id="disable-div"> -->
                                    <div :class="isDisabled == false ? 'enable-board' : 'disable-board'"
                                        class="board has-text-centered columns is-multiline is-mobile game-tictactoe game-three-by-three my-0"
                                        v-if="run" id="disable-div">
                                        <div v-for="(item, index) in board" :key="index" class="column is-4 cell"
                                            :id="index" @click="setItem(index)">
                                            <svg v-if="item == 'O'" aria-label="O" viewBox="0 0 100 100" role="img"
                                                class="ng-tns-c222-17 ng-star-inserted">
                                                <circle cx="50" cy="50" r="35"
                                                    class="ng-tns-c222-17 shape circle-dark-stroked ng-trigger drawShape">
                                                </circle>
                                            </svg>
                                            <svg v-if="item == 'X'" aria-label="X" role="img" viewBox="0 0 128 128"
                                                class="ng-tns-c222-43 ng-star-inserted">
                                                <path d="M16,16L112,112"
                                                    class="ng-tns-c222-43 shape cross-light ng-trigger drawShape">
                                                </path>
                                                <path d="M112,16L16,112"
                                                    class="ng-tns-c222-43 shape cross-light ng-trigger drawShape">
                                                </path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                            <transition name="bounce" v-if="withFriend == true && waiting == false && level == 1">
                                <div class="container">
                                    <div>
                                        <div class="turn-symbol" v-if="run">
                                            3 strikes to win a game
                                        </div>
                                        <!-- <div :class="(currentPlayer == pcPlayer && auth.isGuru !=1 && isDisabled == false) ? 'enable-board' : 'disable-board'" class="board has-text-centered columns is-multiline is-mobile game-tictactoe game-three-by-three" -->
                                        <div :class="isDisabled == false ? 'enable-board' : 'disable-board'"
                                            class="board has-text-centered columns is-multiline is-mobile game-tictactoe game-three-by-three"
                                            v-if="run">
                                            <div v-for="(item, index) in board" :key="index" class="column is-4 cell"
                                                :id="index" @click="setItemWithFriend(index)"> <svg v-if="item == 'O'"
                                                    aria-label="O" viewBox="0 0 100 100" role="img"
                                                    class="ng-tns-c222-17 ng-star-inserted">
                                                    <circle cx="50" cy="50" r="35"
                                                        class="ng-tns-c222-17 shape circle-dark-stroked ng-trigger drawShape">
                                                    </circle>
                                                </svg>
                                                <svg v-if="item == 'X'" aria-label="X" role="img" viewBox="0 0 128 128"
                                                    class="ng-tns-c222-43 ng-star-inserted">
                                                    <path d="M16,16L112,112"
                                                        class="ng-tns-c222-43 shape cross-light ng-trigger drawShape">
                                                    </path>
                                                    <path d="M112,16L16,112"
                                                        class="ng-tns-c222-43 shape cross-light ng-trigger drawShape">
                                                    </path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                            <section class="qr-code-section" v-if="withFriend == true && waiting == true && run == true">
                                <a class="close-icon tooltips" @click=leaveRoom()>
                                    <svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark"
                                        class="svg-inline--fa fa-xmark fa-2x" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 320 512">
                                        <path fill="currentColor"
                                            d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z">
                                        </path>
                                    </svg>
                                    <span class="tooltiptexts">Leave Room</span>
                                </a>
                                <div
                                    class="d-flex justify-content-center align-items-center  h-100 flex-column ng-tns-c165-58">
                                    <div class="display-6 mb-4 text-center  d-md-block animated fast fadeIn  qrcode-h1">
                                        Share this link with a friend <br>
                                        Scan to enter XO game challenge
                                    </div>
                                    <div class="h4 animated fast fadeIn delay-500ms ng-star-inserted">
                                        <div mattooltip="Click to copy" class="mat-tooltip-trigger copy-text"
                                            aria-describedby="cdk-describedby-message-serverApp-1-45">
                                            <span>{{ this.randomLink }}</span>
                                            <a class="copyLink" id="copyLink" @click="copyLink()" data-toggle="tooltip"
                                                title="Copy to Clipboard">
                                                <i class="ng-fa-icon ml-2"><svg role="img" aria-hidden="true"
                                                        focusable="false" data-prefix="fas" data-icon="copy"
                                                        class="svg-inline--fa fa-copy" xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 512 512">
                                                        <path fill="currentColor"
                                                            d="M384 96L384 0h-112c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48H464c26.51 0 48-21.49 48-48V128h-95.1C398.4 128 384 113.6 384 96zM416 0v96h96L416 0zM192 352V128h-144c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h192c26.51 0 48-21.49 48-48L288 416h-32C220.7 416 192 387.3 192 352z">
                                                        </path>
                                                    </svg>
                                                </i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div v-if="level == 2 && showCountdown == false">
                            <!-- reboot -->
                            <transition name="bounce" v-if="withFriend == false">
                                <div class="container" id="guru-disable">
                                    <div class="turn-symbol" v-if="run">
                                        4 strikes to win a game
                                    </div>
                                    <div class="board5 columns is-multiline is-mobile game-tictactoe  mb-0 game-5-by-5"
                                        :class="isDisabled == false ? 'enable-board' : 'disable-board'" v-if="run">
                                        <div v-for="(item, index) in board5" :key="index" class="column is-6 cell"
                                            :id="index" @click="setItem5(index)">
                                            <svg v-if="item == 'O'" aria-label="O" viewBox="0 0 100 100" role="img"
                                                class="ng-tns-c222-17 ng-star-inserted">
                                                <circle cx="50" cy="50" r="35"
                                                    class="ng-tns-c222-17 shape circle-dark-stroked ng-trigger drawShape">
                                                </circle>
                                            </svg>
                                            <svg v-if="item == 'X'" aria-label="X" role="img" viewBox="0 0 128 128"
                                                class="ng-tns-c222-43 ng-star-inserted">
                                                <path d="M16,16L112,112"
                                                    class="ng-tns-c222-43 shape cross-light ng-trigger drawShape">
                                                </path>
                                                <path d="M112,16L16,112"
                                                    class="ng-tns-c222-43 shape cross-light ng-trigger drawShape">
                                                </path>
                                            </svg>
                                        </div>
                                    </div>

                                </div>
                            </transition>
                            <!-- with friend -->
                            <div name="bounce" v-if="withFriend == true && waiting == false">
                                <div id="disable-div">
                                    <div class="container" id="guru-disable">
                                        <div class="turn-symbol" v-if="run">
                                            4 strikes to win a game
                                        </div>
                                        <div class="board5 has-text-centered columns is-multiline is-mobile game-tictactoe m-auto game-5-by-5"
                                            :class="isDisabled == false ? 'enable-board' : 'disable-board'" v-if="run">
                                            <div v-for="(item, index) in board5" :key="index" class="column is-6 cell"
                                                :id="index" @click="setItemWithFriend5(index)">
                                                <svg v-if="item == 'O'" aria-label="O" viewBox="0 0 100 100" role="img"
                                                    class="ng-tns-c222-17 ng-star-inserted">
                                                    <circle cx="50" cy="50" r="35"
                                                        class="ng-tns-c222-17 shape circle-dark-stroked ng-trigger drawShape">
                                                    </circle>
                                                </svg>
                                                <svg v-if="item == 'X'" aria-label="X" role="img" viewBox="0 0 128 128"
                                                    class="ng-tns-c222-43 ng-star-inserted">
                                                    <path d="M16,16L112,112"
                                                        class="ng-tns-c222-43 shape cross-light ng-trigger drawShape">
                                                    </path>
                                                    <path d="M112,16L16,112"
                                                        class="ng-tns-c222-43 shape cross-light ng-trigger drawShape">
                                                    </path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="level == 3 && showCountdown == false">
                            <!-- reboot -->
                            <transition name="bounce" v-if="withFriend == false">
                                <div class="container" id="guru-disable">
                                    <div class="turn-symbol" v-if="run">
                                        4 strikes to win a game
                                    </div>
                                    <!-- <div class="board6 columns is-multiline is-mobile game-tictactoe  mb-0 game-6-by-6" :class="(currentPlayer != pcPlayer && auth.isGuru !=1) ? 'enable-board' : 'disable-board'" v-if="run" id="disable-div"> -->
                                    <div class="board6 columns is-multiline is-mobile game-tictactoe  mb-0 game-6-by-6"
                                        :class="isDisabled == false ? 'enable-board' : 'disable-board'" v-if="run">
                                        <div v-for="(item, index) in board6" :key="index" class="column is-7 cell"
                                            :id="index" @click="setItem6(index)">
                                            <svg v-if="item == 'O'" aria-label="O" viewBox="0 0 100 100" role="img"
                                                class="ng-tns-c222-17 ng-star-inserted">
                                                <circle cx="50" cy="50" r="35"
                                                    class="ng-tns-c222-17 shape circle-dark-stroked ng-trigger drawShape">
                                                </circle>
                                            </svg>
                                            <svg v-if="item == 'X'" aria-label="X" role="img" viewBox="0 0 128 128"
                                                class="ng-tns-c222-43 ng-star-inserted">
                                                <path d="M16,16L112,112"
                                                    class="ng-tns-c222-43 shape cross-light ng-trigger drawShape">
                                                </path>
                                                <path d="M112,16L16,112"
                                                    class="ng-tns-c222-43 shape cross-light ng-trigger drawShape">
                                                </path>
                                            </svg>
                                        </div>
                                    </div>

                                </div>
                            </transition>
                            <!-- with friend -->
                            <div name="bounce" v-if="withFriend == true && waiting == false">
                                <div id="disable-div">
                                    <div class="container" id="guru-disable">
                                        <div class="turn-symbol" v-if="run">
                                            4 strikes to win a game
                                        </div>
                                        <!-- <div class="board6 has-text-centered columns is-multiline is-mobile game-tictactoe m-auto game-6-by-6" :class="(currentPlayer == pcPlayer && auth.isGuru !=1) ? 'enable-board' : 'disable-board'" v-if="run"> -->
                                        <div class="board6 has-text-centered columns is-multiline is-mobile game-tictactoe m-auto game-6-by-6"
                                            :class="isDisabled == false ? 'enable-board' : 'disable-board'" v-if="run">
                                            <div v-for="(item, index) in board6" :key="index" class="column is-7 cell"
                                                :id="index" @click="setItemWithFriend6(index)">
                                                <svg v-if="item == 'O'" aria-label="O" viewBox="0 0 100 100" role="img"
                                                    class="ng-tns-c222-17 ng-star-inserted">
                                                    <circle cx="50" cy="50" r="35"
                                                        class="ng-tns-c222-17 shape circle-dark-stroked ng-trigger drawShape">
                                                    </circle>
                                                </svg>
                                                <svg v-if="item == 'X'" aria-label="X" role="img" viewBox="0 0 128 128"
                                                    class="ng-tns-c222-43 ng-star-inserted">
                                                    <path d="M16,16L112,112"
                                                        class="ng-tns-c222-43 shape cross-light ng-trigger drawShape">
                                                    </path>
                                                    <path d="M112,16L16,112"
                                                        class="ng-tns-c222-43 shape cross-light ng-trigger drawShape">
                                                    </path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="(level == 4 || level == 5) && showCountdown == false">
                            <!-- reboot -->
                            <transition name="bounce" v-if="withFriend == false">
                                <div class="container" id="guru-disable">
                                    <div class="turn-symbol" v-if="run">
                                        5 strikes to win a game
                                    </div>
                                    <div class="board7 columns is-multiline is-mobile game-tictactoe  mb-0 game-7-by-7"
                                        :class="isDisabled == false ? 'enable-board' : 'disable-board'" id="disable-div"
                                        v-if="run">
                                        <div v-for="(item, index) in board7" :key="index" class="column is-8 cell"
                                            :id="index" @click="setItem7(index)">
                                            <svg v-if="item == 'O'" aria-label="O" viewBox="0 0 100 100" role="img"
                                                class="ng-tns-c222-17 ng-star-inserted">
                                                <circle cx="50" cy="50" r="35"
                                                    class="ng-tns-c222-17 shape circle-dark-stroked ng-trigger drawShape">
                                                </circle>
                                            </svg>
                                            <svg v-if="item == 'X'" aria-label="X" role="img" viewBox="0 0 128 128"
                                                class="ng-tns-c222-43 ng-star-inserted">
                                                <path d="M16,16L112,112"
                                                    class="ng-tns-c222-43 shape cross-light ng-trigger drawShape">
                                                </path>
                                                <path d="M112,16L16,112"
                                                    class="ng-tns-c222-43 shape cross-light ng-trigger drawShape">
                                                </path>
                                            </svg>
                                        </div>
                                    </div>

                                </div>
                            </transition>
                            <!-- with friend -->
                            <div name="bounce" v-if="withFriend == true && waiting == false">
                                <div id="disable-div guru-disable">
                                    <div class="turn-symbol" v-if="run">
                                        5 strikes to win a game
                                    </div>
                                    <div class="board7 has-text-centered columns is-multiline is-mobile game-tictactoe m-auto"
                                        :class="isDisabled == false ? 'enable-board' : 'disable-board'" v-if="run">
                                        <div v-for="(item, index) in board7" :key="index" class="column is-8 cell"
                                            :id="index" @click="resetInterval(index); setItemWithFriend7(index)">
                                            <svg v-if="item == 'O'" aria-label="O" viewBox="0 0 100 100" role="img"
                                                class="ng-tns-c222-17 ng-star-inserted">
                                                <circle cx="50" cy="50" r="35"
                                                    class="ng-tns-c222-17 shape circle-dark-stroked ng-trigger drawShape">
                                                </circle>
                                            </svg>
                                            <svg v-if="item == 'X'" aria-label="X" role="img" viewBox="0 0 128 128"
                                                class="ng-tns-c222-43 ng-star-inserted">
                                                <path d="M16,16L112,112"
                                                    class="ng-tns-c222-43 shape cross-light ng-trigger drawShape">
                                                </path>
                                                <path d="M112,16L16,112"
                                                    class="ng-tns-c222-43 shape cross-light ng-trigger drawShape">
                                                </path>
                                            </svg>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="animated fast fadeIn delay-600ms mt-4 ng-star-inserted"
                            v-if="level == 1 && showCountdown == false">
                            <div class="qrcode crcode-img" id="qrcode"></div>
                            <br />
                            <b v-if="withFriend == true && waiting == true && run == true && roomID != ''"
                                style="font-size: 20px;">Code: {{ roomID }}</b>
                        </div>
                        <transition name="bounce">
                            <div class="d-flex" v-if="haveWinner">
                                <a class="button my-5 play-again-btn" @click="continueGame" v-if="withFriend == false">Play
                                    Again</a>
                                <a class="button my-5 play-again-btn" @click="continueGameSocket" v-else>Play Again</a>
                                <!-- <a class="button is-outlined mb-2 leave-room" @click="newGame">Leave Room</a> -->
                                <a class="button my-5 play-again-btn" @click="leaveRoom()">Exit</a>
                            </div>
                            <div class="d-flex flex-column" v-if="draw">
                                <!-- <a class="button mb-2 play-again-btn" @click="changeLevel">Next Level</a> -->
                            </div>
                        </transition>

                    </div>


                </div>
            </section>
        </div>
        <!-- get name of user to porceed furtur -->
        <div class="modal fade in" id="playRoomID" tabindex="-1" aria-labelledby="getAuthModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <form @submit.prevent="checkRoomID()">
                        <div class="modal-body">
                            <div class="form-select-field">
                                <h5 class="form-field-label">Enter Code</h5>
                                <input type="text" name="code" v-model="code" placeholder="Enter Code" class="mat-field"
                                    required>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="continue-btn">Continue<i class="fa fa-arrow-right ml-3"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal fade in" id="getAuth" tabindex="-1" aria-labelledby="getAuthModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <form @submit.prevent="setAuth()">
                        <div class="modal-body">
                            <div class="form-select-field">
                                <h5 class="form-field-label">Nick Name</h5>
                                <input type="text" name="name" v-model="auth.name" placeholder="Enter Name"
                                    class="mat-field" required>
                            </div>
                            <div class="form-select-field" v-if="auth.isGuru == 1">
                                <h5 class="form-field-label">Password</h5>
                                <input type="password" name="password" v-model="auth.password" placeholder="Enter Password"
                                    class="mat-field" required>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="continue-btn">Continue<i class="fa fa-arrow-right ml-3"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal fade in" id="getAuthBoot" tabindex="-1" aria-labelledby="getAuthModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <form @submit.prevent="setAuthWithBoot()">
                        <div class="modal-body">
                            <div class="form-select-field">
                                <h5 class="form-field-label">Name</h5>
                                <input type="text" name="name" v-model="auth.name" placeholder="Enter Name"
                                    class="mat-field" required>
                            </div>
                            <div class="form-select-field" v-if="auth.isGuru == 1">
                                <h5 class="form-field-label">Password</h5>
                                <input type="password" name="password" v-model="auth.password" placeholder="Enter Password"
                                    class="mat-field" required>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="continue-btn">Continue<i class="fa fa-arrow-right ml-3"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


        <div class="modal fade in" id="playAgainModal" tabindex="-1" aria-labelledby="getAuthModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <form>
                        <div class="modal-body">
                            <div class="form-select-field">
                                {{ opponent_name }} wants to play again?
                            </div>
                            <div class="my-3">
                                <a class="btn btn-success mx-2" @click="sendPlayAgainConfirm()">Play again</a>
                                <a class="btn btn-danger mx-2" @click="leaveRoom()">Exit</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
let intervalTimer;
import io from 'socket.io-client';
// development
// const socket = io("http://127.0.0.1:5000", {
//     reconnection: true,
//     reconnectionAttempts: 10,
//     reconnectionDelay: 1000,
//     reconnectionDelayMax: 5000,
//     // randomizationFactor: 0.5,
//     transports: ['websocket'],
//     pingTimeout: 300000, // 5 minutes
//     pingInterval: 25000 // 25 seconds
// });
// production
const socket = io("https://qrfun.net/", {
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    transports: ['websocket'],
    pingTimeout: 300000,
    pingInterval: 25000
});
socket.on('reconnect_attempt', (attemptNumber) => {
});
import axios from "../axios";
export default {
    data() {
        return {
            showCountdown: false,
            countdown: 3,
            board: ["", "", "",
                "", "", "",
                "", "", ""
            ],
            board5: ["", "", "", "", "",
                "", "", "", "", "",
                "", "", "", "", "",
                "", "", "", "", "",
                "", "", "", "", ""
            ],
            board6: ["", "", "", "", "", "",
                "", "", "", "", "", "",
                "", "", "", "", "", "",
                "", "", "", "", "", "",
                "", "", "", "", "", "",
                "", "", "", "", "", ""
            ],
            board7: ["", "", "", "", "", "", "",
                "", "", "", "", "", "", "",
                "", "", "", "", "", "", "",
                "", "", "", "", "", "", "",
                "", "", "", "", "", "", "",
                "", "", "", "", "", "", "",
                "", "", "", "", "", "", ""
            ],
            auth: {
                id: 0,
                name: '',
                nick_name: '',
                password: '',
                userID: '',
                avatar: 'profile-icon.svg',
                isGuru: 0,
            },
            winCombo: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ],
            winCombo5: [
                [0, 1, 2, 3],
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [6, 7, 8, 9],
                [10, 11, 12, 13],
                [11, 12, 13, 14],
                [15, 16, 17, 18],
                [16, 17, 18, 19],
                [20, 21, 22, 23],
                [21, 22, 23, 24],
                [0, 5, 10, 15],
                [5, 10, 15, 20],
                [1, 6, 11, 16],
                [6, 11, 16, 21],
                [2, 7, 12, 17],
                [7, 12, 17, 22],
                [3, 8, 13, 18],
                [8, 13, 18, 23],
                [4, 9, 14, 19],
                [9, 14, 19, 24],
                [5, 11, 17, 23],
                [0, 6, 12, 18],
                [6, 12, 18, 24],
                [1, 7, 13, 19],
                [3, 7, 11, 15],
                [4, 8, 12, 16],
                [8, 12, 16, 20],
                [9, 13, 17, 21],
            ],
            winCombo6: [
                [6, 13, 20, 27],
                [32, 27, 22, 17],
                [2, 9, 16, 23],
                [1, 8, 15, 22],
                [29, 22, 15, 8],
                [35, 28, 21, 14],
                [34, 27, 20, 13],
                [12, 19, 26, 33],
                [14, 15, 16, 17],
                [7, 8, 9, 10],
                [13, 14, 15, 16],
                [19, 20, 21, 22],
                [25, 26, 27, 28],
                [7, 13, 19, 25],
                [8, 14, 20, 26],
                [9, 15, 21, 27],
                [10, 16, 22, 28],
                [7, 14, 21, 28],
                [10, 15, 20, 25],
                [30, 25, 20, 15],
                [0, 1, 2, 3],
                [1, 2, 3, 4],
                [2, 3, 4, 5],
                [6, 7, 8, 9],
                [8, 9, 10, 11],
                [12, 13, 14, 15],
                [18, 19, 20, 21],
                [20, 21, 22, 23],
                [24, 25, 26, 27],
                [26, 27, 28, 29],
                [30, 31, 32, 33],
                [31, 32, 33, 34],
                [32, 33, 34, 35],
                [0, 6, 12, 18],
                [6, 12, 18, 24],
                [12, 18, 24, 30],
                [1, 7, 13, 19],
                [13, 19, 25, 31],
                [2, 8, 14, 20],
                [14, 20, 26, 32],
                [3, 9, 15, 21],
                [15, 21, 27, 33],
                [4, 10, 16, 22],
                [16, 22, 28, 34],
                [5, 11, 17, 23],
                [11, 17, 23, 29],
                [17, 23, 29, 35],
                [0, 7, 14, 21],
                [14, 21, 28, 35],
                [5, 10, 15, 20],
                [15, 20, 25, 30],
                [3, 8, 13, 18],
                [19, 14, 9, 4],
                [24, 19, 14, 9],
                [25, 20, 15, 10],
                [31, 26, 21, 16],
                [11, 16, 21, 26],
                [32, 27, 22, 17],
                [2, 9, 16, 23],
                [1, 8, 15, 22],
                [29, 22, 15, 8],
                [35, 28, 21, 14],
                [34, 27, 20, 13],
                [12, 19, 26, 33]
            ],
            winDiagonals6: [
                [4, 9, 14, 19, 24],
                [5, 10, 15, 20, 25],
                [10, 15, 20, 25, 30],
                [11, 16, 21, 26, 31],
                [0, 7, 14, 21, 28],
                [7, 14, 21, 28, 35],
                [1, 8, 15, 22, 29],
                [6, 13, 20, 27, 34],
                [0, 1, 2, 3, 4],
                [1, 2, 3, 4, 5],
                [6, 7, 8, 9, 10],
                [7, 8, 9, 10, 11],
                [12, 13, 14, 15, 16],
                [13, 14, 15, 16, 17],
                [18, 19, 20, 21, 22],
                [19, 20, 21, 22, 23],
                [24, 25, 26, 27, 28],
                [25, 26, 27, 28, 29],
                [30, 31, 32, 33, 34],
                [31, 32, 33, 34, 35],
                [0, 6, 12, 18, 24],
                [6, 12, 18, 24, 30],
                [1, 7, 13, 19, 25],
                [7, 13, 19, 25, 31],
                [2, 8, 14, 20, 26],
                [8, 14, 20, 26, 32],
                [3, 9, 15, 21, 27],
                [9, 15, 21, 27, 31],
                [4, 10, 16, 22, 28],
                [10, 16, 22, 28, 34],
                [5, 11, 17, 23, 29],
                [11, 17, 23, 29, 35],
            ],
            winCombo7: [
                [0, 1, 2, 3, 4],
                [1, 2, 3, 4, 5],
                [2, 3, 4, 5, 6],
                [7, 8, 9, 10, 11],
                [8, 9, 10, 11, 12],
                [9, 10, 11, 12, 13],
                [14, 15, 16, 17, 18],
                [15, 16, 17, 18, 19],
                [16, 17, 18, 19, 20],
                [21, 22, 23, 24, 25],
                [22, 23, 24, 25, 26],
                [23, 24, 25, 26, 27],
                [28, 29, 30, 31, 32],
                [29, 30, 31, 32, 33],
                [30, 31, 32, 33, 34],
                [35, 36, 37, 38, 39],
                [36, 37, 38, 39, 40],
                [37, 38, 39, 40, 41],
                [42, 43, 44, 45, 46],
                [43, 44, 45, 46, 47],
                [44, 45, 46, 47, 48],
                [4, 10, 16, 22, 28],
                [5, 11, 17, 23, 29],
                [11, 17, 23, 29, 35],
                [6, 12, 18, 24, 30],
                [12, 18, 24, 30, 36],
                [18, 24, 30, 36, 42],
                [13, 19, 25, 31, 37],
                [19, 25, 31, 37, 43],
                [20, 26, 32, 38, 44],
                [2, 10, 18, 26, 34],
                [1, 9, 17, 25, 33],
                [9, 17, 25, 33, 41],
                [0, 8, 16, 24, 32],
                [8, 16, 24, 32, 40],
                [16, 24, 32, 40, 48],
                [7, 15, 23, 31, 39],
                [15, 23, 31, 39, 47],
                [14, 22, 30, 38, 46],
                [0, 7, 14, 21, 28],
                [7, 14, 21, 28, 35],
                [14, 21, 28, 35, 42],
                [1, 8, 15, 22, 29],
                [8, 15, 22, 29, 36],
                [15, 22, 29, 36, 43],
                [2, 9, 16, 23, 30],
                [9, 16, 23, 30, 37],
                [16, 23, 30, 37, 44],
                [3, 10, 17, 24, 31],
                [10, 17, 24, 31, 38],
                [17, 24, 31, 38, 45],
                [4, 11, 18, 25, 32],
                [11, 18, 25, 32, 39],
                [18, 25, 32, 39, 46],
                [5, 12, 19, 26, 33],
                [12, 19, 26, 33, 40],
                [19, 26, 33, 40, 47],
                [6, 13, 20, 27, 34],
                [13, 20, 27, 34, 41],
                [20, 27, 34, 41, 48],
            ],
            fullLenght7: [
                [0, 1, 2, 3, 4, 5, 6],
                [7, 8, 9, 10, 11, 12, 13],
                [14, 15, 16, 17, 18, 19, 20],
                [21, 22, 23, 24, 25, 26, 27],
                [28, 29, 30, 31, 32, 33, 34],
                [35, 36, 37, 38, 39, 40, 41],
                [42, 43, 44, 45, 46, 47, 48],
                [0, 7, 14, 21, 28, 35, 42],
                [1, 8, 15, 22, 29, 36, 43],
                [2, 9, 16, 23, 30, 37, 44],
                [3, 10, 17, 24, 31, 38, 45],
                [4, 11, 18, 25, 32, 39, 46],
                [5, 12, 19, 26, 33, 40, 47],
                [6, 13, 20, 27, 33, 41, 48],
                [0, 8, 16, 24, 32, 40, 48],
                [6, 12, 18, 24, 30, 36, 42],
                [1, 9, 17, 25, 33, 41],
                [7, 15, 23, 31, 39, 47],
                [5, 11, 17, 23, 29, 35],
                [13, 19, 25, 31, 37, 43],
                [14, 22, 30, 38, 45],
                [2, 10, 18, 26, 34],
                [20, 26, 32, 38, 44],
                [4, 10, 16, 22, 28]
            ],
            centerFill7: [
                [1, 2, 3, 4, 5],
                [8, 9, 10, 11, 12],
                [15, 16, 17, 18, 19],
                [22, 23, 24, 25, 26],
                [29, 30, 31, 32, 33],
                [36, 37, 38, 39, 40],
                [43, 44, 45, 46, 47],
                [7, 14, 21, 28, 35],
                [8, 15, 22, 29, 36],
                [9, 16, 23, 30, 37],
                [10, 17, 24, 31, 38],
                [11, 18, 25, 32, 39],
                [12, 19, 26, 33, 40],
                [13, 20, 27, 33, 41],
                [8, 16, 24, 32, 40],
                [12, 18, 24, 30, 36],
                [9, 17, 25, 33],
                [15, 23, 31, 39],
                [11, 17, 23, 29],
                [19, 25, 31, 37]
            ],
            currentPlayer: null,
            player: {
                1: "O",
                2: "X"
            },
            level: 1,
            pcPlayer: 1,
            haveWinner: false,
            draw: false,
            twoHumans: false,
            start: true,
            showChoose: false,
            run: false,
            winner: false,
            roomID: '',
            user: 'host',
            withFriend: false,
            isFull: false,
            socketID: '',
            randomLink: '',
            waiting: true,
            opponent_name: '',
            opponent_avatar: '',
            oppo_is_guru: 0,
            huPlayer: '',
            botPlayer: '',
            canLeave: false,
            nextLevelTimer: 5,
            showNextLevelTimer: false,
            lastLevelTimer: 2,
            showLastLevelTimer: true,
            oppoSocketID: null,
            isWindowVisible: true,
            startPauseTimerCount: 0,
            startPauseTimer: false,
            showWaitingScreen: false,
            winBox: null,
            runOnlyFirstTime: true,
            isDisabled: true,
            muted: true,
            lastInterval: null,
            code: '',
            opp_turn: null,
            oppo_dbID: null,
            mode: ''
        }
    },
    mounted() {
        document.addEventListener("visibilitychange", this.handleVisibilityChange);
    },
    beforeDestroy() {
        document.removeEventListener("visibilitychange", this.handleVisibilityChange);
    },
    created() {
        this.$nextTick(() => {
            $("#ticTocMain").fadeOut();
        })
        this.getUser();
        socket.on('roomFull', (error) => {
            window.location.href = '/room-full';
        });
        if (this.$route.params.opp_turn && this.$route.params.socket_id && this.$route.params.id) {
            this.showWaitingScreen = true;
            setTimeout(() => {
                $("header").fadeOut();
                $("footer").fadeOut();
                this.oppoSocketID = this.$route.params.socket_id;
                this.socketID = socket.id;
                this.roomID = parseInt(this.$route.params.id);
                socket.emit('checkHostStatus', {
                    dbID: this.auth.id,
                    roomID: this.$route.params.id,
                    socketID: this.$route.params.socket_id,
                    hostDBID: this.$route.params.dbid
                })
                // this.addSecondUser(this.$route.params.opp_turn, this.$route.params.socket_id, this.$route.params.id);
            }, 2000);
        }
        socket.on('getReconnectionHost', () => {
            socket.emit('sendBDID', this.auth.id);
        })
        socket.on('checkReconnectionHost', ({
            checkUser
        }) => {
            if (checkUser?.timeout == true) {
                if (this.socketID == checkUser.socketID) {
                    if (this.pcPlayer != this.currentPlayer) {
                        this.currentPlayer = this.currentPlayer == 2 ? 1 : 2;
                    }
                    this.haveWinner = true;
                }
            } else {
                if (checkUser) {
                    if (this.oppoSocketID == checkUser.socketID) {
                        if (checkUser.count > 3) {
                            // alert('disconnectLimitExceeded');
                            socket.emit('disconnectLimitExceeded', {
                                dbID: this.auth.id,
                                socketID: checkUser.socketID,
                                loserID: this.socketID,
                                winnerID: this.oppoSocketID
                            })
                        } else {
                            // alert('First Timee Join ELse')
                            clearInterval(intervalTimer);
                            this.startPauseTimer = false;

                            // socket.emit('hostIsActive', {dbID: this.auth.id, socketID: checkUser.socketID, roomID: this.roomID});
                            // socket.emit('hostIsActive', {dbID: this.$route.params.dbid, socketID: checkUser.socketID, roomID: this.roomID});
                            if (this.oppoSocketID == checkUser.socketID && this.run == false) {
                                // alert('First Timee Join IF')
                                setTimeout(() => {
                                    this.addSecondUser(this.$route.params.opp_turn, this.$route
                                        .params.socket_id, this.$route.params.id);
                                }, 2000);
                            }
                        }
                    }
                }
            }
        });
        socket.on('disconnectLimitExceededResult', ({
            socketID,
            loserID,
            winnerID
        }) => {
            // if(this.pcPlayer != this.currentPlayer){
            //     this.currentPlayer = this.currentPlayer == 2 ? 1 : 2;
            // }
            // this.currentPlayer = this.currentPlayer == 1 ? 2 : 1;
            if (this.socketID == loserID) {
                this.currentPlayer = this.pcPlayer;
                this.haveWinner = true;
            }
            if (this.socketID == winnerID) {
                this.currentPlayer = this.player[this.pcPlayer == 1 ? 2 : 1];
                this.haveWinner = true;
            }
        });
        socket.on('hostStatusActive', ({
            socketID,
            roomID
        }) => {
            // this.startPauseTimer = false;
            // clearInterval(intervalTimer);
            if (this.oppoSocketID == socketID && this.roomID == roomID && this.run == false) {
                if (this.$route.params.opp_turn) {
                    // join when proper link
                    setTimeout(() => {
                        this.addSecondUser(this.$route.params.opp_turn, this.$route.params.socket_id, this.$route.params.id);
                    }, 2000);
                } else {
                    // join when only with code
                    setTimeout(() => {
                        this.addSecondUser(this.opp_turn, this.oppoSocketID, this.roomID);
                    }, 2000);
                }
            }
        });
        socket.on('hostStatusInactive', ({
            socketID,
            roomID
        }) => {
            // if(this.socketID == socketID && this.roomID == roomID){
            //     setTimeout(() => {
            //         this.addSecondUser(this.$route.params.opp_turn, this.$route.params.socket_id, this.$route.params.id);
            //     }, 2000);
            // }
        });
        socket.on("play", ({
            index,
            turn,
            to
        }) => {
            if (this.socketID == to) {
                if (this.level == 1) this.setItemWithFriend(index, turn);
                if (this.level == 2) this.setItemWithFriend5(index, turn);
                if (this.level == 3) this.setItemWithFriend6(index, turn);
                if (this.level == 4) this.setItemWithFriend7(index, turn);
                if (this.level == 5) this.setItemWithFriend7(index, turn);
                if (this.haveWinner == false && this.draw == false) {
                    this.currentPlayer = turn == 2 ? 1 : 2;
                    if (this.pcPlayer == (turn == 2 ? 1 : 2)) {
                        if (this.auth.isGuru == 0) {
                            this.isDisabled = false
                        }
                    }
                }
                // if (this.draw == true) {
                //     this.currentPlayer = turn == 2 ? 1 : 2;
                // }
            }
        })
        socket.on("playAgain", ({
            to
        }) => {
            if (this.socketID == to) {
                // this.oppoWantsToPlayAgain = true;
                $('#playAgainModal').modal('show');
            }
        })
        socket.on("playAgainConfirm", ({
            to
        }) => {
            if (this.socketID == to) {
                this.continueGame();
                // this.oppoWantsToPlayAgain = true;
                // $('#playAgainModal').modal('show');
            }
        })
        socket.on("opponentJoin", ({
            mark,
            opponent_name,
            opponent_avatar,
            mySocketID,
            socketID,
            dbID
        }) => {
            if (this.socketID == socketID) {
                this.oppoSocketID = mySocketID;
                this.opponent_name = opponent_name;
                this.opponent_avatar = opponent_avatar;
                axios.get('check-host-guru-status/' + dbID)
                    .then((res) => {
                        if (res.data.success == true) {
                            this.isDisabled = false;
                            if (res.data.user.is_guru == 1 && this.auth.isGuru == 0) {
                                this.oppo_is_guru = res.data.user.is_guru;
                                this.runOnlyFirstTime = false
                                this.currentPlayer = this.pcPlayer == 1 ? 2 : 1;
                                this.isDisabled = true;
                            }
                            if (res.data.user.is_guru == 1 && this.auth.isGuru == 1) {
                                this.oppo_is_guru = res.data.user.is_guru;
                                this.runOnlyFirstTime = false
                                this.currentPlayer = this.pcPlayer;
                                this.isDisabled = true;
                            }
                            if (this.auth.isGuru == 1) {
                                this.isDisabled = true;
                            }
                            this.waiting = false;
                            socket.emit('sendHostName', {
                                hostName: this.auth.nick_name,
                                hostAvatar: this.auth.avatar,
                                to: this.oppoSocketID,
                                currentPlayer: (res.data.user.is_guru == 1 && this.auth
                                    .isGuru == 1) ? this.currentPlayer : null,
                                isGuru: this.auth.isGuru
                            });
                        }
                    });
                setTimeout(() => {
                    if (this.currentPlayer == this.pcPlayer) {
                        $('#myTurn').addClass('turn-on-avatar');
                        $('#oppositeTurn').removeClass('turn-on-avatar');
                    } else {
                        $('#myTurn').removeClass('turn-on-avatar');
                        $('#oppositeTurn').addClass('turn-on-avatar');
                    }
                }, 4000);
                this.startGame();
            }
        })
        socket.on('hostUnavaiable', (hostSocketID) => {
            alert('Host unavaiable');
        });
        socket.on('getSendHostName', ({
            hostName,
            hostAvatar,
            to,
            currentPlayer,
            isGuru
        }) => {
            if (this.socketID == to) {
                this.opponent_name = hostName;
                this.opponent_avatar = hostAvatar;
                this.oppo_is_guru = isGuru
                if (currentPlayer) {
                    // this.oppo_is_guru = 1;
                    this.currentPlayer = currentPlayer;
                }
            }
        });
        socket.on('clientdisconnect', ({
            room_id,
            canLeave
        }) => {
            window.location.href = '/';
        });
        socket.on('disconnectUserLose', ({
            oppoSocketID
        }) => {
            if (this.oppoSocketID == oppoSocketID) {
                if (this.pcPlayer != this.currentPlayer) {
                    this.currentPlayer = this.currentPlayer == 2 ? 1 : 2;
                }
                this.haveWinner = true;
            }
        });
        socket.on('timerStart', ({
            socketID
        }) => {
            if (this.oppoSocketID == socketID) {
                this.startPauseTimer = true;
                this.startPauseTimerCount = 30;
                intervalTimer = setInterval(() => {
                    this.startPauseTimerCount--;
                    if (this.startPauseTimerCount === 0) {
                        clearInterval(intervalTimer);
                        this.startPauseTimer = false;
                    }
                }, 1000);
            }
        });
        socket.on('incorrectRoom', (room_id) => {
            this.$router.push({
                path: '/room-full'
            })
        });
        socket.on('stopInterval', (opponentSocketID) => {
            if (this.socketID == opponentSocketID) {
                this.startPauseTimer = false;
                clearInterval(intervalTimer);
            }
        });
        socket.on('gameOver', () => {
            window.location.href = "/"
        });
        socket.on('timer-reset', (socketID) => {
            if (socketID == this.socketID) {
                clearInterval(this.lastInterval);
                this.lastLevelTimer = 2;
                // this.showLastLevelTimer = false;
            }
        })
        socket.on('change-turn-after-timeout', (socketID) => {
            if (socketID == this.socketID) {
                clearInterval(this.lastInterval);
                this.lastLevelTimer = 2;
                this.showLastLevelTimer = true;
                if (this.currentPlayer == this.pcPlayer) {
                    $('#myTurn').removeClass('turn-on-avatar');
                    $('#oppositeTurn').addClass('turn-on-avatar');
                } else {
                    $('#myTurn').addClass('turn-on-avatar');
                    $('#oppositeTurn').removeClass('turn-on-avatar');
                }
                if (this.auth.isGuru == 0) {
                    this.isDisabled = false;
                }
                this.lastInterval = setInterval(() => {
                    if (this.lastLevelTimer == 0) {
                        clearInterval(this.lastInterval);
                        // this.switchPlayer();
                        if (this.draw == false || this.haveWinner == false) {
                            var temp = Math.floor(Math.random() * 49);
                            while (!this.isFree7(temp)) {
                                temp = Math.floor(Math.random() * 49);
                            }
                            this.setItemWithFriend7(temp);
                            this.lastLevelTimer = 2;
                            socket.emit('change-turn-timeout', this.oppoSocketID)
                        }
                    }
                    this.lastLevelTimer--;
                }, 1000);
                return;
                // return this.currentPlayer = this.pcPlayer;
            }
        })

    },
    watch: {
        currentPlayer: function () {
            if (this.run == true) {
                this.checkPcTurn();
            }
        },
        run: function () {
            if (this.runOnlyFirstTime) {
                this.checkPcTurn();
            }
        },
    },
    methods: {
        openRoomIDModal() {
            this.mode = 'code';
            if (this.auth.name == null || this.auth.name == "") {
                setTimeout(() => {
                    $('#getAuth').modal('show');
                }, 1000);
            } else {
                $('#playRoomID').modal('show');

            }
        },
        checkRoomID() {
            axios.get('check-room-id-exist/' + this.code)
                .then((res) => {
                    if (res.data.success == false) {
                        alert('Room not found please try another ID. Thanks');
                    } else {
                        $('#playRoomID').modal('hide');
                        this.showWaitingScreen = true;
                        setTimeout(() => {
                            $("header").fadeOut();
                            $("footer").fadeOut();
                            this.oppoSocketID = res.data.user.socketID;
                            this.socketID = socket.id;
                            this.oppo_dbID = res.data.user.dbid;
                            this.roomID = parseInt(res.data.user.roomID);
                            for (let key in this.player) {
                                if (this.player[key] === "X") {
                                    this.opp_turn = parseInt(key);
                                    break;
                                }
                            }
                            socket.emit('checkHostStatus', {
                                dbID: this.auth.id,
                                roomID: res.data.user.roomID,
                                socketID: res.data.user.socketID,
                                hostDBID: res.data.user.dbid
                            })
                        }, 2000);
                    }
                });
        },
        toggleMute() {
            this.muted = !this.muted;
        },
        sendPlayAgainConfirm() {
            $('#playAgainModal').modal('hide');
            socket.emit('playAgainConfirm', {
                to: this.oppoSocketID
            });
            this.continueGame();
        },
        handleVisibilityChange() {
            if (this.twoHumans == true) {
                this.isWindowVisible = !document.hidden;
                if (this.isWindowVisible) {
                    socket.connect();
                    socket.emit('checkGameStatus', {
                        dbID: this.auth.id,
                        opponentSocketID: this.oppoSocketID
                    });
                    if (this.currentPlayer == this.pcPlayer && this.withFriend == true && this.auth.isGuru == 1) {
                        this.checkPcTurn();
                    }
                } else {
                    // alert('Browser window is hidden')
                    socket.emit('manualdisconnect', {
                        dbID: this.auth.id
                    });
                }
            }
        },
        changeLevel() {
            this.level++;
            this.draw = false;
            this.countdown = 3;
            this.showCountdown = true;
            $('#myTurn').removeClass('turn-off-avatar');
            $('#oppositeTurn').removeClass('turn-on-avatar');
            this.isDisabled = true;
            if (this.currentPlayer != this.pcPlayer) {
                if (this.withFriend == false) {
                    this.isDisabled = false;
                }
                setTimeout(() => {
                    $('#myTurn').removeClass('turn-off-avatar');
                    $('#oppositeTurn').addClass('turn-on-avatar');
                }, 6000);
            }
            if (this.auth.isGuru == 1 && this.oppo_is_guru == 0) {
                this.currentPlayer = null
                setTimeout(() => {
                    $('#myTurn').addClass('turn-on-avatar');
                    $('#oppositeTurn').removeClass('turn-ooff-avatar');
                }, 3000);
                if (this.withFriend == true) {
                    this.currentPlayer = this.pcPlayer;
                } else {
                    this.currentPlayer = this.pcPlayer == 1 ? 2 : 1;
                }
            } else if (this.auth.isGuru == 0 && this.oppo_is_guru == 1) {
                this.currentPlayer = null
                setTimeout(() => {
                    $('#myTurn').addClass('turn-on-avatar');
                    $('#oppositeTurn').removeClass('turn-ooff-avatar');
                }, 3000);
                if (this.withFriend == true) {
                    this.currentPlayer = this.pcPlayer == 1 ? 2 : 1;
                }
            } else {

                if ((this.auth.isGuru == 0 && this.oppo_is_guru == 0) && this.withFriend == false) {
                    this.currentPlayer = this.pcPlayer == 1 ? 1 : 2;
                    this.checkPcTurn()
                }
                if ((this.auth.isGuru == 0 && this.oppo_is_guru == 0) && this.withFriend == true) {
                    if (this.currentPlayer == this.pcPlayer) {
                        this.isDisabled = false;
                    }
                }
            }

            this.startGame();
        },
        getUser() {
            Swal.fire({
                text: 'Please Wait',
                didOpen: () => {
                    Swal.showLoading()
                },
            })
            if (localStorage.getItem('t_t_name')) {
                axios.get('login-user/' + localStorage.getItem('t_t_name'))
                    .then((res) => {
                        if (res.data.success == true) {
                            this.auth.id = res.data.user._id;
                            this.auth.name = res.data.user.name;
                            this.auth.nick_name = res.data.user.nick_name;
                            this.auth.userID = res.data.user._id;
                            this.auth.avatar = res.data.user.avatar;
                            this.auth.isGuru = res.data.user.is_guru;
                        }
                        setTimeout(() => {
                            Swal.close()
                        }, 1000);
                    })
            } else {

                setTimeout(() => {
                    Swal.close()
                }, 1000);
            }
        },
        startGame() {
            if (this.muted == true) {
                var snd = new Audio('/assets/sounds/mixkit-ominous-drums-227.wav')
                snd.play();
            }
            this.$nextTick(() => {
                $('#myTurn').removeClass('turn-on-avatar');
                $('#oppositeTurn').addClass('turn-off-avatar');
            })
            this.showCountdown = true;
            const interval = setInterval(() => {
                this.countdown--;
                if (this.countdown === 0) {
                    clearInterval(interval);
                    this.showCountdown = false;

                }
            }, 600);
            setTimeout(() => {
                if (this.auth.isGuru == 1 && this.withFriend == true && this.currentPlayer == this
                    .pcPlayer && this.level != 4) {
                    this.checkPcTurn()
                };
            }, 3000);
        },
        async copyLink() {
            if (window.isSecureContext && navigator.clipboard) {
                await navigator.clipboard.writeText(this.randomLink);
            } else {
                this.unsecuredCopyToClipboard(this.randomLink);
            }
        },
        unsecuredCopyToClipboard(text) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed'; // Make it invisible but still selectable
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();

            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    console.log('Text copied to clipboard');
                } else {
                    console.error('Unable to copy text to clipboard');
                }
            } catch (error) {
                console.error('Error copying text to clipboard:', error);
            }

            document.body.removeChild(textarea);
        },
        leaveRoom() {
            socket.emit('disconnectUser', {
                dbID: this.auth.id,
                room_id: this.roomID,
                canLeave: true,
                to: this.oppoSocketID
            });
            window.location.href = '/';
        },
        generateRandomRoom() {
            if (this.auth.name) {
                this.twoHumans = true;
                this.showChoose = true;
                this.start = false;
                this.withFriend = true;
                $("#ticTocMain").fadeIn();
                $("header").fadeOut();
                $("footer").fadeOut();
                let div1 = document.getElementById("gameBoard");
                div1.style.backgroundColor = "#ffffff";
            } else {
                $('#getAuth').modal('show');
            }
        },
        setAuth() {
            if (this.auth.isGuru == 0) {
                axios.post('user/insert', this.auth)
                    .then((res) => {
                        if (res.data.success == true) {
                            if (res.data.message == 'User created') {
                                this.auth.nick_name = this.auth.name
                                localStorage.setItem('t_t_name', this.auth.name);
                                localStorage.setItem('t_t_nick_name', this.auth.nick_name);
                                localStorage.setItem('t_t_id', this.auth.id);
                                localStorage.setItem('t_t_avatar', this.auth.avatar);
                                localStorage.setItem('t_t_guru', 0);
                                this.auth.name = res.data.user.name;
                                this.auth.id = res.data.user._id;
                                this.auth.avatar = this.auth.avatar;
                                this.auth.isGuru = res.data.user.is_guru;
                            }
                            if (res.data.message == 'User already exists') {
                                this.auth.isGuru = res.data.user.is_guru
                                if (res.data.user.is_guru == 0) {
                                    localStorage.setItem('t_t_nick_name', res.data.user.nick_name);
                                    localStorage.setItem('t_t_name', res.data.user.name);
                                    localStorage.setItem('t_t_id', res.data.user._id);
                                    localStorage.setItem('t_t_avatar', this.auth.avatar);
                                    localStorage.setItem('t_t_guru', res.data.user.is_guru);
                                }
                                this.auth.nick_name = res.data.user.nick_name;
                                this.auth.name = res.data.user.name;
                                this.auth.id = res.data.user._id;
                                this.auth.avatar = this.auth.avatar;
                                this.auth.isGuru = res.data.user.is_guru;
                            }
                            if (res.data.user) {
                                if (res.data.user.is_guru == 0) {
                                    $('#getAuth').modal('hide');
                                    if (this.$route.params.opp_turn) {
                                        this.addSecondUser(this.$route.params.opp_turn, this.$route.params.socket_id, this.$route.params.id);
                                    } else {
                                        this.getUser();
                                        if (this.mode == '') {
                                            this.generateRandomRoom();
                                        }
                                    }
                                }
                            }
                        } else {
                            console.log(res.data.error);
                        }
                    })
            } else {
                axios.post('check-guru-password', this.auth)
                    .then((res) => {
                        if (res.data.success == true) {
                            localStorage.setItem('t_t_name', res.data.user.name);
                            localStorage.setItem('t_t_nick_name', res.data.user.nick_name);
                            localStorage.setItem('t_t_id', res.data.user._id);
                            localStorage.setItem('t_t_avatar', this.auth.avatar);
                            localStorage.setItem('t_t_guru', res.data.user.is_guru);
                            this.auth.isGuru = res.data.user.is_guru
                            $('#getAuth').modal('hide');
                            if (this.$route.params.opp_turn) {
                                this.addSecondUser(this.$route.params.opp_turn, this.$route.params.socket_id,
                                    this.$route.params.id);
                            } else {
                                this.getUser();
                                this.generateRandomRoom();
                            }
                        } else {
                            console.log(res.data.message);
                        }
                    })
            }
        },
        setAuthWithBoot() {
            if (this.auth.isGuru == 0) {
                axios.post('user/insert', this.auth)
                    .then((res) => {
                        if (res.data.success == true) {
                            if (res.data.message == 'User created') {
                                localStorage.setItem('t_t_name', this.auth.name);
                                localStorage.setItem('t_t_nick_name', this.auth.name);
                                localStorage.setItem('t_t_id', this.auth.id);
                                localStorage.setItem('t_t_avatar', 'profile-icon.svg');
                                localStorage.setItem('t_t_guru', 0);
                            }
                            if (res.data.message == 'User already exists') {
                                this.auth.isGuru = res.data.user.is_guru
                                if (res.data.user.is_guru == 0) {
                                    localStorage.setItem('t_t_name', res.data.user.name);
                                    localStorage.setItem('t_t_nick_name', res.data.user.nick_name);
                                    localStorage.setItem('t_t_id', res.data.user._id);
                                    localStorage.setItem('t_t_avatar', 'profile-icon.svg');
                                    localStorage.setItem('t_t_guru', res.data.user.is_guru);
                                }
                                this.auth.nick_name = res.data.user.nick_name;
                                this.auth.name = res.data.user.name;
                                this.auth.id = res.data.user._id;
                                this.auth.avatar = this.auth.avatar;
                                this.auth.isGuru = res.data.user.is_guru;
                            }
                            if (res.data.user) {
                                if (res.data.user.is_guru == 0) {
                                    $('#getAuthBoot').modal('hide');
                                    this.getUser();
                                    this.onePlayer();
                                }
                            }
                            // $('#getAuthBoot').modal('hide');
                        } else {
                            alert(res.data.error.sqlMessage)
                        }
                    })
            } else {
                axios.post('check-guru-password', this.auth)
                    .then((res) => {
                        if (res.data.success == true) {
                            localStorage.setItem('t_t_name', res.data.user.name);
                            localStorage.setItem('t_t_nick_name', res.data.user.nick_name);
                            localStorage.setItem('t_t_id', res.data.user._id);
                            localStorage.setItem('t_t_avatar', this.auth.avatar);
                            localStorage.setItem('t_t_guru', res.data.user.is_guru);
                            this.auth.isGuru = res.data.user.is_guru
                            $('#getAuthBoot').modal('hide');
                            this.getUser();
                            this.onePlayer();
                        } else {
                            console.log(res.data.message);
                        }
                    })
            }
        },
        addSecondUser(opp_turn, socket_id, room_id) {
            if (this.auth.name == null || this.auth.name == "") {
                setTimeout(() => {
                    $('#getAuth').modal('show');
                }, 1000);
            } else {
                // check host is guru or not by host id coming from params
                console.log(this.auth.id, 'this.auth.id');
                socket.emit('joinByLink', {
                    dbID: this.auth.id,
                    roomID: room_id,
                    userID: this.user + this.auth.userID,
                    socketID: socket_id,
                    name: this.auth.nick_name,
                    avatar: this.auth.avatar,
                    mySocketID: socket.id
                });
                this.twoHumans = true;
                this.showChoose = false;
                this.start = false;
                this.withFriend = true;
                this.run = true;
                this.waiting = false;
                this.pcPlayer = opp_turn == 1 ? 2 : 1;
                this.huPlayer = opp_turn == '1' ? 'X' : 'O';
                this.botPlayer = opp_turn == '1' ? 'O' : 'X';

                if (this.auth.isGuru == 1) {
                    this.runOnlyFirstTime = false
                    this.currentPlayer = opp_turn == 1 ? 2 : 1;
                }
                if (this.$route.params.dbid) {
                    axios.get('check-host-guru-status/' + this.$route.params.dbid)
                        .then((res) => {
                            if (res.data.success == true) {
                                if (res.data.user.is_guru == 1) {
                                    this.runOnlyFirstTime = false
                                    this.currentPlayer = opp_turn;
                                }
                                if (res.data.user.is_guru == 0 && this.auth.isGuru == 0) {
                                    this.runOnlyFirstTime = false
                                    this.currentPlayer = opp_turn;
                                }
                                this.oppo_is_guru = res.data.user.is_guru;
                            }
                        });
                } else {
                    axios.get('check-host-guru-status/' + this.oppo_dbID)
                        .then((res) => {
                            if (res.data.success == true) {
                                if (res.data.user.is_guru == 1) {
                                    this.runOnlyFirstTime = false
                                    this.currentPlayer = opp_turn;
                                }
                                if (res.data.user.is_guru == 0 && this.auth.isGuru == 0) {
                                    this.runOnlyFirstTime = false
                                    this.currentPlayer = opp_turn;
                                }
                                this.oppo_is_guru = res.data.user.is_guru;
                            }
                        });

                }
                setTimeout(() => {
                    if (this.currentPlayer == this.pcPlayer) {
                        $('#myTurn').addClass('turn-on-avatar');
                        $('#oppositeTurn').removeClass('turn-on-avatar');
                    } else {
                        $('#myTurn').removeClass('turn-on-avatar');
                        $('#oppositeTurn').addClass('turn-on-avatar');
                    }
                }, 3000);
                $("#ticTocMain").fadeIn();
                $("header").fadeOut();
                $("footer").fadeOut();
                let div1 = document.getElementById("gameBoard");
                div1.style.backgroundColor = "#ffffff";
                if (this.currentPlayer != this.pcPlayer && this.runOnlyFirstTime == true) {
                    this.checkPcTurn();
                }
                if (this.runOnlyFirstTime == true) {
                    this.startGame();
                }
                this.showWaitingScreen = false;

            }
        },
        continueGame: function () {
            this.isDisabled = true;
            this.run = true;
            this.showCountdown = false;
            this.countdown = 3;
            this.board.fill("");
            this.board6.fill("");
            this.board5.fill("");
            this.board7.fill("");
            this.level = 1;
            this.haveWinner = false;
            this.winner = false;
            this.nextLevelTimer = 5;
            this.showNextLevelTimer = false;
            this.startPauseTimerCount = 0;
            this.startPauseTimer = false;
            this.showWaitingScreen = false;
            if (this.winBox.length > 0) {
                this.winBox.forEach((box, index) => {
                    $(`#${box}`).delay(1000 + `${index}000`).removeClass("zoom-in-zoom-out");
                });
            }
            if ($('.column').css('background-color')) {
                $(`.column`).css("background", 'none');
            }
            this.winBox = null;
            this.runOnlyFirstTime = true;
            this.checkPcTurn();
            if (this.currentPlayer == this.pcPlayer && this.withFriend == true) {
                if (this.auth.isGuru == 1) {
                    this.isDisabled = true;
                } else {
                    this.isDisabled = false;
                }
            }
            if (this.currentPlayer == this.pcPlayer && this.withFriend == false) {
                this.isDisabled = true;
            }
            return;
        },
        continueGameSocket() {
            socket.emit('playAgain', {
                to: this.oppoSocketID
            });
        },
        newGame: function () {
            this.haveWinner = false;
            this.draw = false;
            this.board.fill("");
            this.currentPlayer = 1;
            this.pcPlayer = 1;
            this.twoHumans = false;
            this.start = true;
            this.showChoose = false;
            this.run = false;
            this.withFriend = false;
            this.isFull = false;
            this.roomID = '';
            this.randomLink = '';
            this.socketID = '';
            this.$router.push({
                path: '/'
            })
            // return this.checkPcTurn();
            return;
        },
        twoPlayers: function () {
            this.twoHumans = true;
            this.showChoose = true;
            this.start = false;
        },
        onePlayer: function () {
            if (this.auth.name) {
                this.showChoose = true;
                this.start = false;
                $("#ticTocMain").fadeIn();
                $("header").fadeOut();
                $("footer").fadeOut();
                let div1 = document.getElementById("gameBoard");
                div1.style.backgroundColor = "#ffffff";

            } else {
                setTimeout(() => {
                    $('#getAuthBoot').modal('show');
                }, 1000);
            }
        },
        setPlayerOne: function (x) {
            if (this.withFriend == true && this.level == 1) {
                this.pcPlayer = x
            } else {
                this.pcPlayer = x == 1 ? 2 : 1;
                this.opponent_name = 'robot';
                this.opponent_avatar = 'robot.svg';
                this.run = true;
                this.waiting = false;
            }
            this.botPlayer = x == '1' ? 'X' : 'O';
            this.huPlayer = this.player[x];
            this.showChoose = false;
            if (this.withFriend == true && this.level == 1) {
                this.roomID = Math.floor(Math.random() * 900000) + 100000;
                let userID = this.auth.userID;
                this.socketID = socket.id;
                socket.emit('join', {
                    dbID: this.auth.id,
                    roomID: this.roomID,
                    userID: this.user + userID,
                    socketID: this.socketID,
                    mark: this.player[this.pcPlayer],
                    name: this.auth.nick_name
                });
                this.randomLink = window.location.protocol + '//' + window.location.host + '/game/' + this
                    .pcPlayer + '/' + this.socketID + '/' + this.roomID + '/' + this.auth.id;
                this.run = true;
            }
            if (this.withFriend == true && this.level == 1) new QRCode(document.getElementById("qrcode"), this
                .randomLink);
            if (this.auth.isGuru == 1 && this.withFriend == true) {
                this.currentPlayer = this.pcPlayer;
            }
            if (this.auth.isGuru == 0 && this.withFriend == true) {
                this.currentPlayer = this.pcPlayer;
            }
            if (this.auth.isGuru == 1 && this.withFriend == false) {
                this.runOnlyFirstTime = false
                this.currentPlayer = this.pcPlayer == 1 ? 2 : 1;
            }
            if (this.auth.isGuru == 0 && this.withFriend == false) {
                const randomNumber = Math.floor(Math.random() * 2) + 1;
                this.currentPlayer = randomNumber
                if (this.currentPlayer != this.pcPlayer) {
                    this.isDisabled = false
                }
                this.runOnlyFirstTime = false
            }

        },
        checkPcTurn: function () {
            if (this.currentPlayer === this.pcPlayer && this.twoHumans && this.run == true && this.auth.isGuru == 1 && this.waiting == false) {
                setTimeout(() => {
                    if (this.isWindowVisible) {
                        if (this.level == 1) return this.makePcMoveGuru(this.board, this.pcPlayer);
                        if (this.level == 2) return this.makePcMoveGuru5();
                        if (this.level == 3) return this.makePcMoveGuru6();
                        if (this.level == 4) return this.makePcMoveGuru7();
                    }
                }, 3000);
                setTimeout(() => {
                    if (this.isWindowVisible) {
                        if (this.level == 5) {
                            clearInterval(this.lastInterval);
                            return this.makePcMoveGuru7()
                        };
                    }
                }, 1800)
            }
            if (this.currentPlayer === this.pcPlayer && !this.twoHumans && this.run == true) {
                // console.log('2nd');
                setTimeout(() => {
                    if (this.level == 1) return this.makePcMove(this.board, this.pcPlayer);
                    if (this.level == 2) return this.makePcMove5();
                    if (this.level == 3) return this.makePcMove6();
                    if (this.level == 4) return this.makePcMove7();
                }, 3000);
                if (this.level == 5) {
                    setTimeout(() => {
                        return this.makePcMove7();
                    }, 1800)
                }
            }
            if (this.currentPlayer !== this.pcPlayer && !this.twoHumans && this.run == true && this.auth
                .isGuru == 1) {
                console.log('3nd');

                setTimeout(() => {
                    if (this.level == 1) return this.makePcMoveWithoutSocket(this.board, this.pcPlayer);
                    if (this.level == 2) return this.makePcMove5();
                    if (this.level == 3) return this.makePcMove6();
                    if (this.level == 4) return this.makePcMove7();
                    // if (this.level == 5) return this.makePcMove7();
                }, 4000);
                if (this.level == 5) {
                    setTimeout(() => {
                        return this.makePcMove7();
                    }, 1800)
                }
            }
        },
        isFree: function (pos) {
            return this.board[pos] === "";
        },
        isPc: function (pos) {
            return this.board[pos] === this.player[this.pcPlayer];
        },
        isHu: function (pos) {
            return this.board[pos] !== "" && this.board[pos] !== this.player[this.pcPlayer];
        },
        makePcMove: function () {
            if (this.isFree(4)) return this.setItem(4);

            if (this.isPc(0) && this.isPc(2) && this.isFree(1)) return this.setItem(1);
            if (this.isPc(0) && this.isPc(6) && this.isFree(3)) return this.setItem(3);
            if (this.isPc(2) && this.isPc(8) && this.isFree(5)) return this.setItem(5);
            if (this.isPc(6) && this.isPc(8) && this.isFree(7)) return this.setItem(7);

            if (this.isPc(4) && this.isPc(2) && this.isFree(6)) return this.setItem(6);
            if (this.isPc(4) && this.isPc(0) && this.isFree(8)) return this.setItem(8);
            if (this.isPc(4) && this.isPc(6) && this.isFree(2)) return this.setItem(2);
            if (this.isPc(4) && this.isPc(8) && this.isFree(0)) return this.setItem(0);

            if (this.isPc(0) && this.isPc(1) && this.isFree(2)) return this.setItem(2);
            if (this.isPc(1) && this.isPc(2) && this.isFree(0)) return this.setItem(0);
            if (this.isPc(3) && this.isPc(4) && this.isFree(5)) return this.setItem(5);
            if (this.isPc(4) && this.isPc(5) && this.isFree(3)) return this.setItem(3);
            if (this.isPc(7) && this.isPc(8) && this.isFree(6)) return this.setItem(6);
            if (this.isPc(0) && this.isPc(3) && this.isFree(6)) return this.setItem(6);
            if (this.isPc(3) && this.isPc(6) && this.isFree(0)) return this.setItem(0);
            if (this.isPc(1) && this.isPc(4) && this.isFree(7)) return this.setItem(7);
            if (this.isPc(4) && this.isPc(7) && this.isFree(1)) return this.setItem(1);
            if (this.isPc(2) && this.isPc(5) && this.isFree(8)) return this.setItem(8);
            if (this.isPc(5) && this.isPc(8) && this.isFree(2)) return this.setItem(2);
            if (this.isPc(6) && this.isPc(7) && this.isFree(8)) return this.setItem(8);

            if (this.isHu(4) && this.isHu(2) && this.isFree(6)) return this.setItem(6);
            if (this.isHu(4) && this.isHu(0) && this.isFree(8)) return this.setItem(8);
            if (this.isHu(4) && this.isHu(6) && this.isFree(2)) return this.setItem(2);
            if (this.isHu(4) && this.isHu(8) && this.isFree(0)) return this.setItem(0);

            if (this.isHu(0) && this.isHu(2) && this.isFree(1)) return this.setItem(1);
            if (this.isHu(0) && this.isHu(6) && this.isFree(3)) return this.setItem(3);
            if (this.isHu(2) && this.isHu(8) && this.isFree(5)) return this.setItem(5);
            if (this.isHu(6) && this.isHu(8) && this.isFree(7)) return this.setItem(7);

            if (this.isHu(0) && this.isHu(1) && this.isFree(2)) return this.setItem(2);
            if (this.isHu(1) && this.isHu(2) && this.isFree(0)) return this.setItem(0);
            if (this.isHu(3) && this.isHu(4) && this.isFree(5)) return this.setItem(5);
            if (this.isHu(4) && this.isHu(5) && this.isFree(3)) return this.setItem(3);
            if (this.isHu(6) && this.isHu(7) && this.isFree(8)) return this.setItem(8);
            if (this.isHu(7) && this.isHu(8) && this.isFree(6)) return this.setItem(6);

            if (this.isHu(0) && this.isHu(3) && this.isFree(6)) return this.setItem(6);
            if (this.isHu(3) && this.isHu(6) && this.isFree(0)) return this.setItem(0);
            if (this.isHu(1) && this.isHu(4) && this.isFree(7)) return this.setItem(7);
            if (this.isHu(4) && this.isHu(7) && this.isFree(1)) return this.setItem(1);
            if (this.isHu(2) && this.isHu(5) && this.isFree(8)) return this.setItem(8);
            if (this.isHu(5) && this.isHu(8) && this.isFree(2)) return this.setItem(2);
            if (this.isHu(6) && this.isHu(7) && this.isFree(8)) return this.setItem(8);

            if (this.isHu(0) && this.isHu(8) && this.isFree(3)) return this.setItem(3);
            if (this.isHu(2) && this.isHu(6) && this.isFree(5)) return this.setItem(5);
            if (this.isHu(0) && this.isHu(5) && this.isFree(1)) return this.setItem(1);
            if (this.isHu(3) && this.isHu(8) && this.isFree(7)) return this.setItem(7);
            if (this.isHu(5) && this.isHu(6) && this.isFree(7)) return this.setItem(7);
            if (this.isHu(7) && this.isHu(5) && this.isFree(8)) return this.setItem(8);
            if (this.isHu(0) && this.isHu(7) && this.isFree(3) && this.isFree(6)) return this.setItem(6);
            if (this.isHu(2) && this.isHu(7) && this.isFree(5) && this.isFree(8)) return this.setItem(8);
            if (this.auth.isGuru == 0) {
                if (this.isFree(0)) return this.setItem(0);
                if (this.isHu(4) && this.isHu(8)) {
                    if (this.isFree(6)) return this.setItem(6)
                }
            }
            if (this.isFree(1) || this.isFree(3) || this.isFree(5) || this.isFree(7)) {
                var temp = Math.floor(Math.random() * 9 + 1);

                while (!this.isFree(temp)) {
                    temp = Math.floor(Math.random() * 9 + 1);

                }
                return this.setItem(temp);
            }

            if (this.isFree(0) || this.isFree(2) || this.isFree(6) || this.isFree(8)) {
                var temp = Math.floor(Math.random() * 9);

                while (!this.isFree(temp)) {
                    temp = Math.floor(Math.random() * 9);

                }
                return this.setItem(temp);
            }

        },
        makePcMoveWithoutSocket: function () {
            if (this.isFree(4)) return this.setItem(4);
            if (this.isHu(4) && this.isHu(2) && this.isFree(6)) return this.setItem(6);
            if (this.isHu(4) && this.isHu(0) && this.isFree(8)) return this.setItem(8);
            if (this.isHu(4) && this.isHu(6) && this.isFree(2)) return this.setItem(2);
            if (this.isHu(4) && this.isHu(8) && this.isFree(0)) return this.setItem(0);

            if (this.isHu(0) && this.isHu(2) && this.isFree(1)) return this.setItem(1);
            if (this.isHu(0) && this.isHu(6) && this.isFree(3)) return this.setItem(3);
            if (this.isHu(2) && this.isHu(8) && this.isFree(5)) return this.setItem(5);
            if (this.isHu(6) && this.isHu(8) && this.isFree(7)) return this.setItem(7);

            if (this.isHu(0) && this.isHu(1) && this.isFree(2)) return this.setItem(2);
            if (this.isHu(1) && this.isHu(2) && this.isFree(0)) return this.setItem(0);
            if (this.isHu(3) && this.isHu(4) && this.isFree(5)) return this.setItem(5);
            if (this.isHu(4) && this.isHu(5) && this.isFree(3)) return this.setItem(3);
            if (this.isHu(6) && this.isHu(7) && this.isFree(8)) return this.setItem(8);
            if (this.isHu(7) && this.isHu(8) && this.isFree(6)) return this.setItem(6);

            if (this.isHu(0) && this.isHu(3) && this.isFree(6)) return this.setItem(6);
            if (this.isHu(3) && this.isHu(6) && this.isFree(0)) return this.setItem(0);
            if (this.isHu(1) && this.isHu(4) && this.isFree(7)) return this.setItem(7);
            if (this.isHu(4) && this.isHu(7) && this.isFree(1)) return this.setItem(1);
            if (this.isHu(2) && this.isHu(5) && this.isFree(8)) return this.setItem(8);
            if (this.isHu(5) && this.isHu(8) && this.isFree(2)) return this.setItem(2);
            if (this.isHu(6) && this.isHu(7) && this.isFree(8)) return this.setItem(8);

            if (this.isHu(0) && this.isHu(8) && this.isFree(3)) return this.setItem(3);
            if (this.isHu(2) && this.isHu(6) && this.isFree(5)) return this.setItem(5);
            if (this.isHu(0) && this.isHu(5) && this.isFree(1)) return this.setItem(1);
            if (this.isHu(3) && this.isHu(8) && this.isFree(7)) return this.setItem(7);
            if (this.isHu(5) && this.isHu(6) && this.isFree(7)) return this.setItem(7);
            if (this.isHu(7) && this.isHu(5) && this.isFree(8)) return this.setItem(8);
            if (this.isHu(0) && this.isHu(7) && this.isFree(3) && this.isFree(6)) return this.setItem(6);
            if (this.isHu(2) && this.isHu(7) && this.isFree(5) && this.isFree(8)) return this.setItem(8);

            if (this.isPc(0) && this.isPc(2) && this.isFree(1)) return this.setItem(1);
            if (this.isPc(0) && this.isPc(6) && this.isFree(3)) return this.setItem(3);
            if (this.isPc(2) && this.isPc(8) && this.isFree(5)) return this.setItem(5);
            if (this.isPc(6) && this.isPc(8) && this.isFree(7)) return this.setItem(7);

            if (this.isPc(4) && this.isPc(2) && this.isFree(6)) return this.setItem(6);
            if (this.isPc(4) && this.isPc(0) && this.isFree(8)) return this.setItem(8);
            if (this.isPc(4) && this.isPc(6) && this.isFree(2)) return this.setItem(2);
            if (this.isPc(4) && this.isPc(8) && this.isFree(0)) return this.setItem(0);

            if (this.isPc(0) && this.isPc(1) && this.isFree(2)) return this.setItem(2);
            if (this.isPc(1) && this.isPc(2) && this.isFree(0)) return this.setItem(0);
            if (this.isPc(3) && this.isPc(4) && this.isFree(5)) return this.setItem(5);
            if (this.isPc(4) && this.isPc(5) && this.isFree(3)) return this.setItem(3);
            if (this.isPc(7) && this.isPc(8) && this.isFree(6)) return this.setItem(6);
            if (this.isPc(0) && this.isPc(3) && this.isFree(6)) return this.setItem(6);
            if (this.isPc(3) && this.isPc(6) && this.isFree(0)) return this.setItem(0);
            if (this.isPc(1) && this.isPc(4) && this.isFree(7)) return this.setItem(7);
            if (this.isPc(4) && this.isPc(7) && this.isFree(1)) return this.setItem(1);
            if (this.isPc(2) && this.isPc(5) && this.isFree(8)) return this.setItem(8);
            if (this.isPc(5) && this.isPc(8) && this.isFree(2)) return this.setItem(2);
            if (this.isPc(6) && this.isPc(7) && this.isFree(8)) return this.setItem(8);

            if (this.isFree(0)) return this.setItem(0);
            if (this.isHu(4) && this.isHu(8)) {
                if (this.isFree(6)) return this.setItem(6)
            }
            if (this.isFree(1) || this.isFree(3) || this.isFree(5) || this.isFree(7)) {
                var temp = Math.floor(Math.random() * 9 + 1);

                while (!this.isFree(temp)) {
                    temp = Math.floor(Math.random() * 9 + 1);

                }
                return this.setItem(temp);
            }

            if (this.isFree(0) || this.isFree(2) || this.isFree(6) || this.isFree(8)) {
                var temp = Math.floor(Math.random() * 9);

                while (!this.isFree(temp)) {
                    temp = Math.floor(Math.random() * 9);

                }
                return this.setItem(temp);
            }

        },
        makePcMoveGuru: function () {
            if (socket.connected == true) {
                if (this.isFree(4)) return this.setItemWithFriend(4);

                if (this.isPc(0) && this.isPc(2) && this.isFree(1)) return this.setItemWithFriend(1);
                if (this.isPc(0) && this.isPc(6) && this.isFree(3)) return this.setItemWithFriend(3);
                if (this.isPc(2) && this.isPc(8) && this.isFree(5)) return this.setItemWithFriend(5);
                if (this.isPc(6) && this.isPc(8) && this.isFree(7)) return this.setItemWithFriend(7);

                if (this.isPc(4) && this.isPc(2) && this.isFree(6)) return this.setItemWithFriend(6);
                if (this.isPc(4) && this.isPc(0) && this.isFree(8)) return this.setItemWithFriend(8);
                if (this.isPc(4) && this.isPc(6) && this.isFree(2)) return this.setItemWithFriend(2);
                if (this.isPc(4) && this.isPc(8) && this.isFree(0)) return this.setItemWithFriend(0);

                if (this.isPc(0) && this.isPc(1) && this.isFree(2)) return this.setItemWithFriend(2);
                if (this.isPc(1) && this.isPc(2) && this.isFree(0)) return this.setItemWithFriend(0);
                if (this.isPc(3) && this.isPc(4) && this.isFree(5)) return this.setItemWithFriend(5);
                if (this.isPc(4) && this.isPc(5) && this.isFree(3)) return this.setItemWithFriend(3);
                if (this.isPc(7) && this.isPc(8) && this.isFree(6)) return this.setItemWithFriend(6);
                if (this.isPc(0) && this.isPc(3) && this.isFree(6)) return this.setItemWithFriend(6);
                if (this.isPc(3) && this.isPc(6) && this.isFree(0)) return this.setItemWithFriend(0);
                if (this.isPc(1) && this.isPc(4) && this.isFree(7)) return this.setItemWithFriend(7);
                if (this.isPc(4) && this.isPc(7) && this.isFree(1)) return this.setItemWithFriend(1);
                if (this.isPc(2) && this.isPc(5) && this.isFree(8)) return this.setItemWithFriend(8);
                if (this.isPc(5) && this.isPc(8) && this.isFree(2)) return this.setItemWithFriend(2);
                if (this.isPc(6) && this.isPc(7) && this.isFree(8)) return this.setItemWithFriend(8);

                if (this.isHu(4) && this.isHu(2) && this.isFree(6)) return this.setItemWithFriend(6);
                if (this.isHu(4) && this.isHu(0) && this.isFree(8)) return this.setItemWithFriend(8);
                if (this.isHu(4) && this.isHu(6) && this.isFree(2)) return this.setItemWithFriend(2);
                if (this.isHu(4) && this.isHu(8) && this.isFree(0)) return this.setItemWithFriend(0);

                if (this.isHu(0) && this.isHu(2) && this.isFree(1)) return this.setItemWithFriend(1);
                if (this.isHu(0) && this.isHu(6) && this.isFree(3)) return this.setItemWithFriend(3);
                if (this.isHu(2) && this.isHu(8) && this.isFree(5)) return this.setItemWithFriend(5);
                if (this.isHu(6) && this.isHu(8) && this.isFree(7)) return this.setItemWithFriend(7);

                if (this.isHu(0) && this.isHu(1) && this.isFree(2)) return this.setItemWithFriend(2);
                if (this.isHu(1) && this.isHu(2) && this.isFree(0)) return this.setItemWithFriend(0);
                if (this.isHu(3) && this.isHu(4) && this.isFree(5)) return this.setItemWithFriend(5);
                if (this.isHu(4) && this.isHu(5) && this.isFree(3)) return this.setItemWithFriend(3);
                if (this.isHu(6) && this.isHu(7) && this.isFree(8)) return this.setItemWithFriend(8);
                if (this.isHu(7) && this.isHu(8) && this.isFree(6)) return this.setItemWithFriend(6);

                if (this.isHu(0) && this.isHu(3) && this.isFree(6)) return this.setItemWithFriend(6);
                if (this.isHu(3) && this.isHu(6) && this.isFree(0)) return this.setItemWithFriend(0);
                if (this.isHu(1) && this.isHu(4) && this.isFree(7)) return this.setItemWithFriend(7);
                if (this.isHu(4) && this.isHu(7) && this.isFree(1)) return this.setItemWithFriend(1);
                if (this.isHu(2) && this.isHu(5) && this.isFree(8)) return this.setItemWithFriend(8);
                if (this.isHu(5) && this.isHu(8) && this.isFree(2)) return this.setItemWithFriend(2);
                if (this.isHu(6) && this.isHu(7) && this.isFree(8)) return this.setItemWithFriend(8);

                if (this.isHu(0) && this.isHu(8) && this.isFree(3)) return this.setItemWithFriend(3);
                if (this.isHu(2) && this.isHu(6) && this.isFree(5)) return this.setItemWithFriend(5);
                if (this.isHu(0) && this.isHu(5) && this.isFree(1)) return this.setItemWithFriend(1);
                if (this.isHu(3) && this.isHu(8) && this.isFree(7)) return this.setItemWithFriend(7);
                if (this.isHu(5) && this.isHu(6) && this.isFree(7)) return this.setItemWithFriend(7);
                if (this.isHu(7) && this.isHu(5) && this.isFree(8)) return this.setItemWithFriend(8);
                if (this.isHu(0) && this.isHu(7) && this.isFree(3) && this.isFree(6)) return this.setItemWithFriend(6);
                if (this.isHu(2) && this.isHu(7) && this.isFree(5) && this.isFree(8)) return this.setItemWithFriend(8);

                if (this.isFree(0)) return this.setItemWithFriend(0);
                if (this.isHu(4) && this.isHu(8)) {
                    if (this.isFree(6)) return this.setItemWithFriend(6)
                }

                if (this.isFree(1) || this.isFree(3) || this.isFree(5) || this.isFree(7)) {
                    var temp = Math.floor(Math.random() * 9 + 1);

                    while (!this.isFree(temp)) {
                        temp = Math.floor(Math.random() * 9 + 1);

                    }
                    return this.setItemWithFriend(temp);
                }

                if (this.isFree(0) || this.isFree(2) || this.isFree(6) || this.isFree(8)) {
                    var temp = Math.floor(Math.random() * 9);

                    while (!this.isFree(temp)) {
                        temp = Math.floor(Math.random() * 9);

                    }
                    return this.setItemWithFriend(temp);
                }
            }
        },
        setItemWithFriend: function (index, to) {
            if (this.board[index] === "" && !this.haveWinner) {
                this.isDisabled = true;
                this.$set(this.board, index, this.player[this.currentPlayer]);
                if ($('.column').css('background-color')) {
                    $(`.column`).css("background", 'none');
                }
                $(`#${index}`).delay(1000 + `1000`).css("background", 'yellow');
                if (!this.checkWin(this.board, this.player[this.currentPlayer])) {
                    if (this.board.indexOf("") == "-1") {
                        this.draw = true;
                        if (this.muted == true) {
                            var snd = new Audio('./assets/sounds/mixkit-ethereal-fairy-win-sound-2019.wav')
                            snd.play()
                        }
                        socket.emit('play', {
                            index,
                            turn: this.currentPlayer,
                            to: this.oppoSocketID
                        });
                        this.nextLevelTimer = 5;
                        this.showNextLevelTimer = true;
                        const interval = setInterval(() => {
                            this.nextLevelTimer--;
                            if (this.nextLevelTimer === 0) {
                                clearInterval(interval);
                                this.showNextLevelTimer = false;
                                this.changeLevel();
                            }
                        }, 600);
                    } else {
                        socket.emit('play', {
                            index,
                            turn: this.currentPlayer,
                            to: this.oppoSocketID
                        });
                        if (this.muted == true) {
                            var snd = new Audio('/assets/sounds/mixkit-achievement-bell-600.wav');
                            snd.play();
                        }
                        if (this.currentPlayer == this.pcPlayer) {
                            $('#myTurn').removeClass('turn-on-avatar');
                            $('#oppositeTurn').addClass('turn-on-avatar');
                        } else {
                            $('#myTurn').addClass('turn-on-avatar');
                            $('#oppositeTurn').removeClass('turn-on-avatar');
                        }
                    }
                } else {
                    this.haveWinner = true;
                    if (this.muted == true) {
                        var snd = new Audio('./assets/sounds/mixkit-males-yes-victory-2012.wav')
                        snd.play();
                    }
                    socket.emit('play', {
                        index,
                        turn: this.currentPlayer,
                        to: this.oppoSocketID
                    });
                    this.winBox.forEach((box, index) => {
                        $(`#${box}`).delay(1000 + `${index}000`).addClass("zoom-in-zoom-out");
                    });
                }
            }
        },
        setItem: function (index) {
            if (this.board[index] === "" && !this.haveWinner) {
                this.isDisabled = true;
                this.$set(this.board, index, this.player[this.currentPlayer]);
                if ($('.column').css('background-color')) {
                    $(`.column`).css("background", 'none');
                }
                $(`#${index}`).delay(1000 + `1000`).css("background", 'yellow');
                if (!this.checkWin(this.board, this.player[this.currentPlayer])) {
                    if (this.board.indexOf("") == "-1") {
                        this.draw = true;
                        if (this.muted == true) {
                            var snd = new Audio('./assets/sounds/mixkit-ethereal-fairy-win-sound-2019.wav')
                            snd.play();
                        }
                        this.nextLevelTimer = 5;
                        this.showNextLevelTimer = true;
                        const interval = setInterval(() => {
                            this.nextLevelTimer--;
                            if (this.nextLevelTimer === 0) {
                                clearInterval(interval);
                                this.showNextLevelTimer = false;
                                this.changeLevel();
                            }
                        }, 1000);
                        if (this.withFriend == false && this.currentPlayer != this.pcPlayer) {
                            this.currentPlayer = this.pcPlayer == 1 ? 1 : 2;
                        }
                    } else {
                        this.switchPlayer();
                        if (this.currentPlayer != this.pcPlayer) {
                            if (this.auth.isGuru == 0) {
                                this.isDisabled = false;
                            }
                        }
                    }
                    if (this.muted == true) {
                        var snd = new Audio('/assets/sounds/mixkit-achievement-bell-600.wav');
                        snd.play();
                    }
                } else {
                    this.haveWinner = true;
                    if (this.muted == true) {
                        var snd = new Audio('./assets/sounds/mixkit-males-yes-victory-2012.wav')
                        snd.play();
                    }
                    this.winBox.forEach((box, index) => {
                        $(`#${box}`).delay(1000 + `${index}000`).addClass("zoom-in-zoom-out");
                    });
                }
            }
        },
        switchPlayer: function () {
            if (this.currentPlayer === 1) {
                if (this.currentPlayer == this.pcPlayer) {
                    $('#myTurn').addClass('turn-on-avatar');
                    $('#oppositeTurn').removeClass('turn-on-avatar');
                } else {
                    $('#myTurn').removeClass('turn-on-avatar');
                    $('#oppositeTurn').addClass('turn-on-avatar');
                }
                return this.currentPlayer = 2;
            }
            if (this.currentPlayer === 2) {
                if (this.currentPlayer == this.pcPlayer) {
                    $('#myTurn').addClass('turn-on-avatar');
                    $('#oppositeTurn').removeClass('turn-on-avatar');
                } else {
                    $('#myTurn').removeClass('turn-on-avatar');
                    $('#oppositeTurn').addClass('turn-on-avatar');
                }
                return this.currentPlayer = 1;
            }
        },
        checkWin: function (board, player) {
            var stat = board.map(function (x, i) {
                if (x === player) return i;
            }, this);
            for (let index = 0; index < this.winCombo.length; index++) {
                if (stat.indexOf(this.winCombo[index][0]) !== -1 && stat.indexOf(this.winCombo[index][1]) !== -
                    1 && stat.indexOf(this.winCombo[index][2]) !== -1) {
                    this.winBox = this.winCombo[index];
                    return true;
                };
            }
            return false;
        },
        // START 5X5 METHODS
        isFree5: function (pos) {
            return this.board5[pos] === "";
        },
        isPc5: function (pos) {
            return this.board5[pos] === this.player[this.pcPlayer];
        },
        isHu5: function (pos) {
            return this.board5[pos] !== "" && this.board5[pos] !== this.player[this.pcPlayer];
        },
        makePcMove5: function () {
            if (this.isFree5(12)) return this.setItem5(12);
            for (let win = 0; win < this.winCombo5.length; win++) {
                let [w, x, y, z] = this.winCombo5[win];
                if (this.board5[w] == this.botPlayer && this.board5[x] == this.botPlayer && this.board5[y] ==
                    this.botPlayer && this.board5[z] == "") {
                    return this.setItem5(z);
                }
                if (this.board5[w] == this.botPlayer && this.board5[x] == this.botPlayer && this.board5[z] ==
                    this.botPlayer && this.board5[y] == "") {
                    return this.setItem5(y);
                }
                if (this.board5[w] == this.botPlayer && this.board5[y] == this.botPlayer && this.board5[z] ==
                    this.botPlayer && this.board5[x] == "") {
                    return this.setItem5(x);
                }
                if (this.board5[x] == this.botPlayer && this.board5[y] == this.botPlayer && this.board5[z] ==
                    this.botPlayer && this.board5[w] == "") {
                    return this.setItem5(w);
                }
            }
            for (let win = 0; win < this.winCombo5.length; win++) {
                let [a, b, c, d] = this.winCombo5[win];
                if (this.board5[a] == this.huPlayer && this.board5[b] == this.huPlayer && this.board5[c] == this
                    .huPlayer && this.board5[d] == "") {
                    return this.setItem5(d);
                }
                if (this.board5[a] == this.huPlayer && this.board5[b] == this.huPlayer && this.board5[d] == this
                    .huPlayer && this.board5[c] == "") {
                    return this.setItem5(c);
                }
                if (this.board5[a] == this.huPlayer && this.board5[c] == this.huPlayer && this.board5[d] == this
                    .huPlayer && this.board5[b] == "") {
                    return this.setItem5(b);
                }
                if (this.board5[b] == this.huPlayer && this.board5[c] == this.huPlayer && this.board5[d] == this
                    .huPlayer && this.board5[a] == "") {
                    return this.setItem5(a);
                }
            }
            for (let win = 0; win < this.winCombo5.length; win++) {
                let [e, f, g, h] = this.winCombo5[win];
                if (this.board5[e] == this.botPlayer && this.board5[f] == this.botPlayer && this.board5[g] ==
                    "" && this.board5[h] == "") {
                    return this.setItem5(g);
                }
                if (this.board5[e] == "" && this.board5[f] == "" && this.board5[g] == this.botPlayer && this
                    .board5[h] == this.botPlayer) {
                    return this.setItem5(f);
                }
                if (this.board5[e] == this.botPlayer && this.board5[f] == "" && this.board5[g] == "" && this
                    .board5[h] == this.botPlayer) {
                    return this.setItem5(f);
                }
                if (this.board5[e] == "" && this.board5[f] == this.botPlayer && this.board5[g] == this
                    .botPlayer && this.board5[h] == "") {
                    return this.setItem5(h);
                }
                if (this.board5[e] == this.botPlayer && this.board5[f] == "" && this.board5[g] == this
                    .botPlayer && this.board5[h] == "") {
                    return this.setItem5(f);
                }
                if (this.board5[e] == "" && this.board5[f] == this.botPlayer && this.board5[g] == "" && this
                    .board5[h] == this.botPlayer) {
                    return this.setItem5(g);
                }
            }

            for (let win = 0; win < this.winCombo5.length; win++) {
                let [m, n, o, p] = this.winCombo5[win];
                if (this.board5[m] == this.huPlayer && this.board5[n] == this.huPlayer && this.board5[o] ==
                    "" && this.board5[p] == "") {
                    return this.setItem5(o);
                }
                if (this.board5[m] == "" && this.board5[n] == "" && this.board5[o] == this.huPlayer && this
                    .board5[p] == this.huPlayer) {
                    return this.setItem5(n);
                }
                if (this.board5[m] == this.huPlayer && this.board5[n] == "" && this.board5[o] == "" && this
                    .board5[p] == this.huPlayer) {
                    return this.setItem5(n);
                }
                if (this.board5[m] == "" && this.board5[n] == this.huPlayer && this.board5[o] == this
                    .huPlayer && this.board5[p] == "") {
                    return this.setItem5(p);
                }
                if (this.board5[m] == this.huPlayer && this.board5[n] == "" && this.board5[o] == this
                    .huPlayer && this.board5[p] == "") {
                    return this.setItem5(n);
                }
                if (this.board5[m] == "" && this.board5[n] == this.huPlayer && this.board5[o] == "" && this
                    .board5[p] == this.huPlayer) {
                    return this.setItem5(o);
                }
            }
            if (this.isFree5(6) || this.isFree5(8) || this.isFree5(16) || this.isFree5(18)) {
                const arr = [16, 18, 6, 8];
                let isCornerEmpty = true;
                const randomIndex = Math.floor(Math.random() * arr.length);
                let item = arr[randomIndex];
                while (!this.isFree5(item)) {
                    item = arr[Math.floor(Math.random() * arr.length)];
                }
                if (arr.indexOf(item) !== -1) {
                    arr.splice(arr.indexOf(item), 1);
                    for (let index = 0; index < arr.length; index++) {
                        if (this.isFree5(arr[index])) {
                            isCornerEmpty = true;
                            break;
                        } else {
                            isCornerEmpty = false;
                        }
                    }
                }
                if (isCornerEmpty == true) {
                    return this.setItem5(item);
                }

            }
            if (this.isFree5(7) || this.isFree5(11) || this.isFree5(13) || this.isFree5(17)) {
                const arr = [7, 11, 13, 17];
                const randomIndex = Math.floor(Math.random() * arr.length);
                let item = arr[randomIndex];
                while (!this.isFree5(item)) {
                    item = arr[Math.floor(Math.random() * arr.length)];
                }
                return this.setItem5(item);

            }

            if (this.isFree5(1) || this.isFree5(2) || this.isFree5(3) || this.isFree5(5) || this.isFree5(10) ||
                this.isFree5(15) || this.isFree5(21) || this.isFree5(22) || this.isFree5(23) || this.isFree5(
                    9) || this.isFree5(14) || this.isFree5(19)) {
                var temp = Math.floor(Math.random() * 25 + 1);
                while (!this.isFree5(temp)) {
                    temp = Math.floor(Math.random() * 25 + 1);
                }
                return this.setItem5(temp);
            }
            if (this.isFree5(0) || this.isFree5(4) || this.isFree5(20) || this.isFree5(24)) {
                var temp = Math.floor(Math.random() * 25);
                while (!this.isFree5(temp)) {
                    temp = Math.floor(Math.random() * 25);

                }
                return this.setItem5(temp);
            }
        },
        makePcMoveGuru5: function () {
            if (this.isFree5(12)) return this.setItemWithFriend5(12);
            for (let win = 0; win < this.winCombo5.length; win++) {
                let [a, b, c, d] = this.winCombo5[win];
                if (this.board5[a] == this.huPlayer && this.board5[b] == this.huPlayer && this.board5[c] == this
                    .huPlayer && this.board5[d] == "") {
                    return this.setItemWithFriend5(d);
                }
                if (this.board5[a] == this.huPlayer && this.board5[b] == this.huPlayer && this.board5[d] == this
                    .huPlayer && this.board5[c] == "") {
                    return this.setItemWithFriend5(c);
                }
                if (this.board5[a] == this.huPlayer && this.board5[c] == this.huPlayer && this.board5[d] == this
                    .huPlayer && this.board5[b] == "") {
                    return this.setItemWithFriend5(b);
                }
                if (this.board5[b] == this.huPlayer && this.board5[c] == this.huPlayer && this.board5[d] == this
                    .huPlayer && this.board5[a] == "") {
                    return this.setItemWithFriend5(a);
                }
            }
            for (let win = 0; win < this.winCombo5.length; win++) {
                let [w, x, y, z] = this.winCombo5[win];
                if (this.board5[w] == this.botPlayer && this.board5[x] == this.botPlayer && this.board5[y] ==
                    this.botPlayer && this.board5[z] == "") {
                    return this.setItemWithFriend5(z);
                }
                if (this.board5[w] == this.botPlayer && this.board5[x] == this.botPlayer && this.board5[z] ==
                    this.botPlayer && this.board5[y] == "") {
                    return this.setItemWithFriend5(y);
                }
                if (this.board5[w] == this.botPlayer && this.board5[y] == this.botPlayer && this.board5[z] ==
                    this.botPlayer && this.board5[x] == "") {
                    return this.setItemWithFriend5(x);
                }
                if (this.board5[x] == this.botPlayer && this.board5[y] == this.botPlayer && this.board5[z] ==
                    this.botPlayer && this.board5[w] == "") {
                    return this.setItemWithFriend5(w);
                }
            }
            for (let win = 0; win < this.winCombo5.length; win++) {
                let [m, n, o, p] = this.winCombo5[win];
                if (this.board5[m] == this.huPlayer && this.board5[n] == this.huPlayer && this.board5[o] ==
                    "" && this.board5[p] == "") {
                    return this.setItemWithFriend5(o);
                }
                if (this.board5[m] == "" && this.board5[n] == "" && this.board5[o] == this.huPlayer && this
                    .board5[p] == this.huPlayer) {
                    return this.setItemWithFriend5(n);
                }
                if (this.board5[m] == this.huPlayer && this.board5[n] == "" && this.board5[o] == "" && this
                    .board5[p] == this.huPlayer) {
                    return this.setItemWithFriend5(n);
                }
                if (this.board5[m] == "" && this.board5[n] == this.huPlayer && this.board5[o] == this
                    .huPlayer && this.board5[p] == "") {
                    return this.setItemWithFriend5(p);
                }
                if (this.board5[m] == this.huPlayer && this.board5[n] == "" && this.board5[o] == this
                    .huPlayer && this.board5[p] == "") {
                    return this.setItemWithFriend5(n);
                }
                if (this.board5[m] == "" && this.board5[n] == this.huPlayer && this.board5[o] == "" && this
                    .board5[p] == this.huPlayer) {
                    return this.setItemWithFriend5(o);
                }
            }
            for (let win = 0; win < this.winCombo5.length; win++) {
                let [e, f, g, h] = this.winCombo5[win];
                if (this.board5[e] == this.botPlayer && this.board5[f] == this.botPlayer && this.board5[g] ==
                    "" && this.board5[h] == "") {
                    return this.setItemWithFriend5(g);
                }
                if (this.board5[e] == "" && this.board5[f] == "" && this.board5[g] == this.botPlayer && this
                    .board5[h] == this.botPlayer) {
                    return this.setItemWithFriend5(f);
                }
                if (this.board5[e] == this.botPlayer && this.board5[f] == "" && this.board5[g] == "" && this
                    .board5[h] == this.botPlayer) {
                    return this.setItemWithFriend5(f);
                }
                if (this.board5[e] == "" && this.board5[f] == this.botPlayer && this.board5[g] == this
                    .botPlayer && this.board5[h] == "") {
                    return this.setItemWithFriend5(h);
                }
                if (this.board5[e] == this.botPlayer && this.board5[f] == "" && this.board5[g] == this
                    .botPlayer && this.board5[h] == "") {
                    return this.setItemWithFriend5(f);
                }
                if (this.board5[e] == "" && this.board5[f] == this.botPlayer && this.board5[g] == "" && this
                    .board5[h] == this.botPlayer) {
                    return this.setItemWithFriend5(g);
                }
            }
            if (this.isFree5(6) || this.isFree5(8) || this.isFree5(16) || this.isFree5(18)) {
                const arr = [16, 18, 6, 8];
                let isCornerEmpty = true;
                const randomIndex = Math.floor(Math.random() * arr.length);
                let item = arr[randomIndex];
                while (!this.isFree5(item)) {
                    item = arr[Math.floor(Math.random() * arr.length)];
                }
                if (arr.indexOf(item) !== -1) {
                    arr.splice(arr.indexOf(item), 1);
                    for (let index = 0; index < arr.length; index++) {
                        if (this.isFree5(arr[index])) {
                            isCornerEmpty = true;
                            break;
                        } else {
                            isCornerEmpty = false;
                        }
                    }
                }
                if (isCornerEmpty == true) {
                    return this.setItemWithFriend5(item);
                }

            }
            if (this.isFree5(7) || this.isFree5(11) || this.isFree5(13) || this.isFree5(17)) {
                const arr = [7, 11, 13, 17];
                const randomIndex = Math.floor(Math.random() * arr.length);
                let item = arr[randomIndex];
                while (!this.isFree5(item)) {
                    item = arr[Math.floor(Math.random() * arr.length)];
                }
                return this.setItemWithFriend5(item);

            }

            if (this.isFree5(1) || this.isFree5(2) || this.isFree5(3) || this.isFree5(5) || this.isFree5(10) ||
                this.isFree5(15) || this.isFree5(21) || this.isFree5(22) || this.isFree5(23) || this.isFree5(
                    9) || this.isFree5(14) || this.isFree5(19)) {
                var temp = Math.floor(Math.random() * 25 + 1);
                while (!this.isFree5(temp)) {
                    temp = Math.floor(Math.random() * 25 + 1);
                }
                return this.setItemWithFriend5(temp);
            }
            if (this.isFree5(0) || this.isFree5(4) || this.isFree5(20) || this.isFree5(24)) {
                var temp = Math.floor(Math.random() * 25);
                while (!this.isFree5(temp)) {
                    temp = Math.floor(Math.random() * 25);

                }
                return this.setItemWithFriend5(temp);
            }
        },
        setItem5: function (index) {
            if (this.board5[index] === "" && !this.haveWinner) {
                this.isDisabled = true;
                this.$set(this.board5, index, this.player[this.currentPlayer]);
                if ($('.column').css('background-color')) {
                    $(`.column`).css("background", 'none');
                }
                $(`#${index}`).delay(1000 + `1000`).css("background", 'yellow');
                if (!this.checkWin5(this.board5, this.player[this.currentPlayer])) {
                    if (this.board5.indexOf("") == "-1") {
                        this.draw = true;
                        if (this.muted == true) {
                            var snd = new Audio('./assets/sounds/mixkit-ethereal-fairy-win-sound-2019.wav')
                            snd.play();
                        }
                        this.nextLevelTimer = 5;
                        this.showNextLevelTimer = true;
                        const interval = setInterval(() => {
                            this.nextLevelTimer--;
                            if (this.nextLevelTimer === 0) {
                                clearInterval(interval);
                                this.showNextLevelTimer = false;
                                this.changeLevel();
                            }
                        }, 1000);
                        if (this.withFriend == false && this.currentPlayer != this.pcPlayer) {
                            this.currentPlayer = (this.pcPlayer == 1 ? 1 : 2);
                        }

                    } else {
                        this.switchPlayer();
                        if (this.currentPlayer != this.pcPlayer) {
                            if (this.auth.isGuru == 0) {
                                this.isDisabled = false;
                            }
                        }
                    }
                    if (this.muted == true) {
                        var snd = new Audio('./assets/sounds/mixkit-achievement-bell-600.wav')
                        snd.play();
                    }
                } else {
                    this.haveWinner = true;
                    this.winBox.forEach((box, index) => {
                        $(`#${box}`).delay(1000 + `${index}000`).addClass("zoom-in-zoom-out");
                    });
                    if (this.muted == true) {
                        var snd = new Audio('./assets/sounds/mixkit-males-yes-victory-2012.wav')
                        snd.play();
                    }
                }
            }
        },
        setItemWithFriend5: function (index) {
            if (this.board5[index] === "" && !this.haveWinner) {
                this.isDisabled = true;
                this.$set(this.board5, index, this.player[this.currentPlayer]);
                if ($('.column').css('background-color')) {
                    $(`.column`).css("background", 'none');
                }
                $(`#${index}`).delay(1000 + `1000`).css("background", 'yellow');
                if (!this.checkWin5(this.board5, this.player[this.currentPlayer])) {
                    if (this.board5.indexOf("") == "-1") {
                        this.draw = true;
                        socket.emit('play', {
                            index,
                            turn: this.currentPlayer,
                            to: this.oppoSocketID
                        });
                        this.nextLevelTimer = 5;
                        this.showNextLevelTimer = true;
                        const interval = setInterval(() => {
                            this.nextLevelTimer--;
                            if (this.nextLevelTimer === 0) {
                                clearInterval(interval);
                                this.showNextLevelTimer = false;
                                this.changeLevel();
                            }
                        }, 600);
                    } else {
                        socket.emit('play', {
                            index,
                            turn: this.currentPlayer,
                            to: this.oppoSocketID
                        });
                        if (this.currentPlayer == this.pcPlayer) {
                            $('#myTurn').removeClass('turn-on-avatar');
                            $('#oppositeTurn').addClass('turn-on-avatar');
                        } else {
                            $('#myTurn').addClass('turn-on-avatar');
                            $('#oppositeTurn').removeClass('turn-on-avatar');
                        }
                    }
                    if (this.muted == true) {
                        var snd = new Audio('/assets/sounds/mixkit-achievement-bell-600.wav');
                        snd.play();
                    }
                } else {
                    this.haveWinner = true;
                    if (this.muted == true) {
                        var snd = new Audio('./assets/sounds/mixkit-males-yes-victory-2012.wav')
                        snd.play();
                    }
                    this.winBox.forEach((box, index) => {
                        $(`#${box}`).delay(1000 + `${index}000`).addClass("zoom-in-zoom-out");
                    });
                    socket.emit('play', {
                        index,
                        turn: this.currentPlayer,
                        to: this.oppoSocketID
                    });
                }
            }
        },
        checkWin5: function (board5, player) {
            var stat5 = board5.map(function (x, i) {
                if (x === player) return i;
            }, this);
            for (let index5 = 0; index5 < this.winCombo5.length; index5++) {
                if (stat5.indexOf(this.winCombo5[index5][0]) !== -1 && stat5.indexOf(this.winCombo5[index5][
                    1]) !== -1 &&
                    stat5.indexOf(this.winCombo5[index5][2]) !== -1 && stat5.indexOf(this.winCombo5[index5][
                        3]) !== -1 &&
                    stat5.indexOf(this.winCombo5[index5][4]) !== -1) {
                    this.winBox = this.winCombo5[index5];
                    return true;
                };
            }
            return false;
        },
        // START 6X6 METHODS
        isFree6: function (pos) {
            return this.board6[pos] === "";
        },
        isPc6: function (pos) {
            return this.board6[pos] === this.player[this.pcPlayer];
        },
        isHu6: function (pos) {
            return this.board6[pos] !== "" && this.board6[pos] !== this.player[this.pcPlayer];
        },
        makePcMove6: function () {
            if (this.isFree6(15)) return this.setItem6(15);
            for (let win = 0; win < this.winCombo6.length; win++) {
                let [w, x, y, z] = this.winCombo6[win];
                if (this.board6[w] == this.botPlayer && this.board6[x] == this.botPlayer && this.board6[y] ==
                    this.botPlayer && this.board6[z] == "") {
                    return this.setItem6(z);
                }
                if (this.board6[w] == this.botPlayer && this.board6[x] == this.botPlayer && this.board6[z] ==
                    this.botPlayer && this.board6[y] == "") {
                    return this.setItem6(y);
                }
                if (this.board6[w] == this.botPlayer && this.board6[y] == this.botPlayer && this.board6[z] ==
                    this.botPlayer && this.board6[x] == "") {
                    return this.setItem6(x);
                }
                if (this.board6[x] == this.botPlayer && this.board6[y] == this.botPlayer && this.board6[z] ==
                    this.botPlayer && this.board6[w] == "") {
                    return this.setItem6(w);
                }
            }
            for (let win = 0; win < this.winCombo6.length; win++) {
                let [a, b, c, d] = this.winCombo6[win];
                if (this.board6[a] == this.huPlayer && this.board6[b] == this.huPlayer && this.board6[c] == this
                    .huPlayer && this.board6[d] == "") {
                    return this.setItem6(d);
                }
                if (this.board6[a] == this.huPlayer && this.board6[b] == this.huPlayer && this.board6[d] == this
                    .huPlayer && this.board6[c] == "") {
                    return this.setItem6(c);
                }
                if (this.board6[a] == this.huPlayer && this.board6[c] == this.huPlayer && this.board6[d] == this
                    .huPlayer && this.board6[b] == "") {
                    return this.setItem6(b);
                }
                if (this.board6[b] == this.huPlayer && this.board6[c] == this.huPlayer && this.board6[d] == this
                    .huPlayer && this.board6[a] == "") {
                    return this.setItem6(a);
                }
            }
            if (this.isFree6(20)) return this.setItem6(20);

            for (let win = 0; win < this.winDiagonals6.length; win++) {
                let [a, b, c, d, e] = this.winDiagonals6[win];
                if (this.board6[a] == "" && this.board6[b] == this.botPlayer && this.board6[c] == this
                    .botPlayer && this.board6[d] == "" && this.board6[e] == "") {
                    return this.setItem6(d);
                }
                if (this.board6[a] == "" && this.board6[b] == "" && this.board6[c] == this.botPlayer && this
                    .board6[d] == this.botPlayer && this.board6[e] == "") {
                    return this.setItem6(b);
                }
                if (this.board6[a] == "" && this.board6[b] == this.botPlayer && this.board6[c] == "" && this
                    .board6[d] == this.botPlayer && this.board6[e] == "") {
                    return this.setItem6(c);
                }
            }
            for (let win = 0; win < this.winCombo6.length; win++) {
                let [e, f, g, h] = this.winCombo6[win];
                if (this.board6[e] == this.botPlayer && this.board6[f] == this.botPlayer && this.board6[g] ==
                    "" && this.board6[h] == "") {
                    return this.setItem6(g);
                }
                if (this.board6[e] == "" && this.board6[f] == "" && this.board6[g] == this.botPlayer && this
                    .board6[h] == this.botPlayer) {
                    return this.setItem6(f);
                }
                if (this.board6[e] == this.botPlayer && this.board6[f] == "" && this.board6[g] == "" && this
                    .board6[h] == this.botPlayer) {
                    return this.setItem6(f);
                }
                if (this.board6[e] == "" && this.board6[f] == this.botPlayer && this.board6[g] == this
                    .botPlayer && this.board6[h] == "") {
                    return this.setItem6(e);
                }
                if (this.board6[e] == this.botPlayer && this.board6[f] == "" && this.board6[g] == this
                    .botPlayer && this.board6[h] == "") {
                    return this.setItem6(f);
                }
                if (this.board6[e] == "" && this.board6[f] == this.botPlayer && this.board6[g] == "" && this
                    .board6[h] == this.botPlayer) {
                    return this.setItem6(g);
                }
            }
            //check diagnoal and block diagnoals
            for (let win = 0; win < this.winDiagonals6.length; win++) {
                let [a, b, c, d, e] = this.winDiagonals6[win];
                if (this.board6[a] == "" && this.board6[b] == this.huPlayer && this.board6[c] == this
                    .huPlayer && this.board6[d] == "" && this.board6[e] == "") {
                    return this.setItem6(d);
                }
                if (this.board6[a] == "" && this.board6[b] == "" && this.board6[c] == this.huPlayer && this
                    .board6[d] == this.huPlayer && this.board6[e] == "") {
                    return this.setItem6(b);
                }
                if (this.board6[a] == "" && this.board6[b] == this.huPlayer && this.board6[c] == "" && this
                    .board6[d] == this.huPlayer && this.board6[e] == "") {
                    return this.setItem6(c);
                }
            }

            for (let win = 0; win < this.winCombo6.length; win++) {
                let [m, n, o, p] = this.winCombo6[win];
                if (this.board6[m] == this.huPlayer && this.board6[n] == this.huPlayer && this.board6[o] ==
                    "" && this.board6[p] == "") {
                    return this.setItem6(o);
                }
                if (this.board6[m] == "" && this.board6[n] == "" && this.board6[o] == this.huPlayer && this
                    .board6[p] == this.huPlayer) {
                    return this.setItem6(n);
                }
                if (this.board6[m] == this.huPlayer && this.board6[n] == "" && this.board6[o] == "" && this
                    .board6[p] == this.huPlayer) {
                    return this.setItem6(n);
                }
                if (this.board6[m] == "" && this.board6[n] == this.huPlayer && this.board6[o] == this
                    .huPlayer && this.board6[p] == "") {
                    return this.setItem6(p);
                }
                if (this.board6[m] == this.huPlayer && this.board6[n] == "" && this.board6[o] == this
                    .huPlayer && this.board6[p] == "") {
                    return this.setItem6(n);
                }
                if (this.board6[m] == "" && this.board6[n] == this.huPlayer && this.board6[o] == "" && this
                    .board6[p] == this.huPlayer) {
                    return this.setItem6(o);
                }
            }
            if (this.isFree6(14) || this.isFree6(15) || this.isFree6(20) || this.isFree6(21)) {
                const arr = [14, 15, 20, 21];
                const randomIndex = Math.floor(Math.random() * arr.length);
                let item = arr[randomIndex];
                while (!this.isFree6(item)) {
                    item = arr[Math.floor(Math.random() * arr.length)];
                }
                return this.setItem6(item);
            }
            if (this.isFree6(25) && this.isHu6(20) && this.isHu6(10) && this.isHu6(25)) {
                if (this.isFree6(22)) return this.setItem6(22);
            }
            if (this.isPc6(15) && this.isPc6(20) && this.isFree6(25) && this.isFree6(10)) {

                if (this.isFree6(25)) return this.setItem6(25);
            }
            if (this.isPc6(15) && this.isPc6(22) && this.isFree6(8) && this.isFree6(29) && this.isFree6(1)) {

                if (this.isFree6(8)) return this.setItem6(8);
            }
            if (this.isFree6(7) || this.isFree6(8) || this.isFree6(9) || this.isFree6(10) || this.isFree6(13) ||
                this.isFree6(19) || this.isFree6(25) || this.isFree6(26) ||
                this.isFree6(27) || this.isFree6(28) || this.isFree6(16) || this.isFree6(22)) {
                var temp = Math.floor(Math.random() * 36);
                while (!this.isFree6(temp)) {
                    temp = Math.floor(Math.random() * 36);

                }
                return this.setItem6(temp);
            }
            if (this.isFree6(2) || this.isFree6(3) || this.isFree6(12) || this.isFree6(18) || this.isFree6(
                17) || this.isFree6(23) || this.isFree6(32) || this.isFree6(33)) {
                var temp = Math.floor(Math.random() * 36 + 1);
                while (!this.isFree6(temp)) {
                    temp = Math.floor(Math.random() * 36 + 1);
                }
                return this.setItem6(temp);
            }
            if (this.isFree6(0) || this.isFree6(5) || this.isFree6(30) || this.isFree6(35) || this.isFree6(1) ||
                this.isFree6(4) || this.isFree6(6) || this.isFree6(11) ||
                this.isFree6(24) || this.isFree6(29) || this.isFree6(31) || this.isFree6(34)) {
                var temp = Math.floor(Math.random() * 36);
                while (!this.isFree6(temp)) {
                    temp = Math.floor(Math.random() * 36);

                }
                return this.setItem6(temp);
            }


        },
        makePcMoveGuru6: function () {
            if (this.isFree6(15)) return this.setItemWithFriend6(15);
            for (let win = 0; win < this.winCombo6.length; win++) {
                let [a, b, c, d] = this.winCombo6[win];
                if (this.board6[a] == this.huPlayer && this.board6[b] == this.huPlayer && this.board6[c] == this
                    .huPlayer && this.board6[d] == "") {
                    return this.setItemWithFriend6(d);
                }
                if (this.board6[a] == this.huPlayer && this.board6[b] == this.huPlayer && this.board6[d] == this
                    .huPlayer && this.board6[c] == "") {
                    return this.setItemWithFriend6(c);
                }
                if (this.board6[a] == this.huPlayer && this.board6[c] == this.huPlayer && this.board6[d] == this
                    .huPlayer && this.board6[b] == "") {
                    return this.setItemWithFriend6(b);
                }
                if (this.board6[b] == this.huPlayer && this.board6[c] == this.huPlayer && this.board6[d] == this
                    .huPlayer && this.board6[a] == "") {
                    return this.setItemWithFriend6(a);
                }
            }
            for (let win = 0; win < this.winCombo6.length; win++) {
                let [w, x, y, z] = this.winCombo6[win];
                if (this.board6[w] == this.botPlayer && this.board6[x] == this.botPlayer && this.board6[y] ==
                    this.botPlayer && this.board6[z] == "") {
                    return this.setItemWithFriend6(z);
                }
                if (this.board6[w] == this.botPlayer && this.board6[x] == this.botPlayer && this.board6[z] ==
                    this.botPlayer && this.board6[y] == "") {
                    return this.setItemWithFriend6(y);
                }
                if (this.board6[w] == this.botPlayer && this.board6[y] == this.botPlayer && this.board6[z] ==
                    this.botPlayer && this.board6[x] == "") {
                    return this.setItemWithFriend6(x);
                }
                if (this.board6[x] == this.botPlayer && this.board6[y] == this.botPlayer && this.board6[z] ==
                    this.botPlayer && this.board6[w] == "") {
                    return this.setItemWithFriend6(w);
                }
            }

            if (this.isFree6(20)) return this.setItemWithFriend6(20);
            if (this.isFree6(25) && this.isHu6(20)) {
                if (this.isFree6(22)) return this.setItemWithFriend6(22);
            }
            if (this.isPc6(15) && this.isPc6(20) && this.isFree6(25) && this.isFree6(10)) {
                if (this.isFree6(25)) return this.setItemWithFriend6(25);
            }
            if (this.isPc6(15) && this.isPc6(22) && this.isFree6(8) && this.isFree6(29) && this.isFree6(1)) {
                if (this.isFree6(8)) return this.setItemWithFriend6(8);
            }
            //check diagnoal and block diagnoals
            for (let win = 0; win < this.winDiagonals6.length; win++) {
                let [a, b, c, d, e] = this.winDiagonals6[win];
                if (this.board6[a] == "" && this.board6[b] == this.huPlayer && this.board6[c] == this.huPlayer && this.board6[d] == "" && this.board6[e] == "") {
                    return this.setItemWithFriend6(d);
                }
                if (this.board6[a] == "" && this.board6[b] == "" && this.board6[c] == this.huPlayer && this.board6[d] == this.huPlayer && this.board6[e] == "") {
                    return this.setItemWithFriend6(b);
                }
                if (this.board6[a] == "" && this.board6[b] == this.huPlayer && this.board6[c] == "" && this.board6[d] == this.huPlayer && this.board6[e] == "") {
                    return this.setItemWithFriend6(c);
                }
            }
            for (let win = 0; win < this.winCombo6.length; win++) {
                let [m, n, o, p] = this.winCombo6[win];
                if (this.board6[m] == this.huPlayer && this.board6[n] == this.huPlayer && this.board6[o] == "" && this.board6[p] == "") {
                    return this.setItemWithFriend6(o);
                }
                if (this.board6[m] == "" && this.board6[n] == "" && this.board6[o] == this.huPlayer && this.board6[p] == this.huPlayer) {
                    return this.setItemWithFriend6(n);
                }
                if (this.board6[m] == this.huPlayer && this.board6[n] == "" && this.board6[o] == "" && this.board6[p] == this.huPlayer) {
                    return this.setItemWithFriend6(n);
                }
                if (this.board6[25] == this.botPlayer && this.board6[31] == this.botPlayer && this.board6[19] == this.huPlayer && this.board6[26] == this.huPlayer) {
                    if (this.isFree6[33]) {
                        // if (this.board6[m] == "" && this.board6[n] == this.huPlayer && this.board6[o] == this.huPlayer && this.board6[p] == "") {
                        // console.log('a')
                        return this.setItemWithFriend6(33);
                        // }
                    }
                }
                else if (this.board6[24] == this.botPlayer && this.board6[25] == this.botPlayer && this.board6[19] == this.huPlayer && this.board6[26] == this.huPlayer) {
                    if (this.isFree6[12]) {
                        // if (this.board6[m] == "" && this.board6[n] == this.huPlayer && this.board6[o] == this.huPlayer && this.board6[p] == "") {
                        // console.log('ab')
                        return this.setItemWithFriend6(12);
                        // }
                    }
                }
                else if (this.board6[10] == this.botPlayer && this.board6[4] == this.botPlayer && this.board6[9] == this.huPlayer && this.board6[16] == this.huPlayer) {
                    if (this.isFree6[2]) {
                        // if (this.board6[m] == "" && this.board6[n] == this.huPlayer && this.board6[o] == this.huPlayer && this.board6[p] == "") {
                        // console.log('ac')
                        return this.setItemWithFriend6(2);
                        // }
                    }
                }
                else if (this.board6[10] == this.botPlayer && this.board6[11] == this.botPlayer && this.board6[9] == this.huPlayer && this.board6[16] == this.huPlayer) {
                    if (this.isFree6[23]) {
                        // if (this.board6[m] == "" && this.board6[n] == this.huPlayer && this.board6[o] == this.huPlayer && this.board6[p] == "") {
                        // console.log('ad')
                        return this.setItemWithFriend6(23);
                        // }
                    }
                } else {
                    if (this.board6[m] == "" && this.board6[n] == this.huPlayer && this.board6[o] == this.huPlayer && this.board6[p] == "") {
                        // console.log('af')
                        return this.setItemWithFriend6(p);
                    }
                }
                if (this.board6[m] == this.huPlayer && this.board6[n] == "" && this.board6[o] == this.huPlayer && this.board6[p] == "") {
                    return this.setItemWithFriend6(n);
                }
                if (this.board6[m] == "" && this.board6[n] == this.huPlayer && this.board6[o] == "" && this.board6[p] == this.huPlayer) {
                    return this.setItemWithFriend6(o);
                }
            }

            for (let win = 0; win < this.winDiagonals6.length; win++) {
                let [a, b, c, d, e] = this.winDiagonals6[win];
                if (this.board6[a] == "" && this.board6[b] == this.botPlayer && this.board6[c] == this
                    .botPlayer && this.board6[d] == "" && this.board6[e] == "") {
                    return this.setItemWithFriend6(d);
                }
                if (this.board6[a] == "" && this.board6[b] == "" && this.board6[c] == this.botPlayer && this
                    .board6[d] == this.botPlayer && this.board6[e] == "") {
                    return this.setItemWithFriend6(b);
                }
                if (this.board6[a] == "" && this.board6[b] == this.botPlayer && this.board6[c] == "" && this
                    .board6[d] == this.botPlayer && this.board6[e] == "") {
                    return this.setItemWithFriend6(c);
                }
            }

            for (let win = 0; win < this.winCombo6.length; win++) {
                let [e, f, g, h] = this.winCombo6[win];
                if (this.board6[e] == this.botPlayer && this.board6[f] == this.botPlayer && this.board6[g] ==
                    "" && this.board6[h] == "") {
                    return this.setItemWithFriend6(g);
                }
                if (this.board6[e] == "" && this.board6[f] == "" && this.board6[g] == this.botPlayer && this
                    .board6[h] == this.botPlayer) {
                    return this.setItemWithFriend6(f);
                }
                if (this.board6[e] == this.botPlayer && this.board6[f] == "" && this.board6[g] == "" && this
                    .board6[h] == this.botPlayer) {
                    return this.setItemWithFriend6(f);
                }
                if (this.board6[e] == "" && this.board6[f] == this.botPlayer && this.board6[g] == this
                    .botPlayer && this.board6[h] == "") {
                    return this.setItemWithFriend6(e);
                }
                if (this.board6[e] == this.botPlayer && this.board6[f] == "" && this.board6[g] == this
                    .botPlayer && this.board6[h] == "") {
                    return this.setItemWithFriend6(f);
                }
                if (this.board6[e] == "" && this.board6[f] == this.botPlayer && this.board6[g] == "" && this
                    .board6[h] == this.botPlayer) {
                    return this.setItemWithFriend6(g);
                }
            }
            if (this.isFree6(14) || this.isFree6(15) || this.isFree6(20) || this.isFree6(21)) {
                const arr = [14, 15, 20, 21];
                const randomIndex = Math.floor(Math.random() * arr.length);
                let item = arr[randomIndex];
                while (!this.isFree6(item)) {
                    item = arr[Math.floor(Math.random() * arr.length)];
                }
                return this.setItemWithFriend6(item);
            }

            if (this.isFree6(7) || this.isFree6(8) || this.isFree6(9) || this.isFree6(10) || this.isFree6(13) ||
                this.isFree6(19) || this.isFree6(25) || this.isFree6(26) ||
                this.isFree6(27) || this.isFree6(28) || this.isFree6(16) || this.isFree6(22)) {
                var temp = Math.floor(Math.random() * 36);
                while (!this.isFree6(temp)) {
                    temp = Math.floor(Math.random() * 36);

                }
                return this.setItemWithFriend6(temp);
            }
            if (this.isFree6(14) || this.isFree6(15) || this.isFree6(20) || this.isFree6(21)) {
                var temp = Math.floor(Math.random() * 36);
                while (!this.isFree6(temp)) {
                    temp = Math.floor(Math.random() * 36);

                }
                return this.setItemWithFriend6(temp);
            }
            if (this.isFree6(2) || this.isFree6(3) || this.isFree6(12) || this.isFree6(18) || this.isFree6(
                17) || this.isFree6(23) || this.isFree6(32) || this.isFree6(33)) {
                var temp = Math.floor(Math.random() * 36 + 1);
                while (!this.isFree6(temp)) {
                    temp = Math.floor(Math.random() * 36 + 1);
                }
                return this.setItemWithFriend6(temp);
            }
            if (this.isFree6(0) || this.isFree6(5) || this.isFree6(30) || this.isFree6(35) || this.isFree6(1) ||
                this.isFree6(4) || this.isFree6(6) || this.isFree6(11) ||
                this.isFree6(24) || this.isFree6(29) || this.isFree6(31) || this.isFree6(34)) {
                var temp = Math.floor(Math.random() * 36);
                while (!this.isFree6(temp)) {
                    temp = Math.floor(Math.random() * 36);

                }
                return this.setItemWithFriend6(temp);
            }

        },
        setItem6: function (index) {
            if (this.board6[index] === "" && !this.haveWinner) {
                this.isDisabled = true;
                this.$set(this.board6, index, this.player[this.currentPlayer]);
                if ($('.column').css('background-color')) {
                    $(`.column`).css("background", 'none');
                }
                $(`#${index}`).delay(1000 + `1000`).css("background", 'yellow');
                // setTimeout(() => {
                //     $(`#${index}`).css("background", 'none');
                // }, 5000);
                if (!this.checkWin6(this.board6, this.player[this.currentPlayer])) {
                    if (this.board6.indexOf("") == "-1") {
                        this.draw = true;
                        if (this.muted == true) {
                            var snd = new Audio('./assets/sounds/mixkit-ethereal-fairy-win-sound-2019.wav')
                            snd.play();
                        }
                        this.nextLevelTimer = 5;
                        this.showNextLevelTimer = true;
                        const interval = setInterval(() => {
                            this.nextLevelTimer--;
                            if (this.nextLevelTimer === 0) {
                                clearInterval(interval);
                                this.showNextLevelTimer = false;
                                this.changeLevel();
                            }
                        }, 1000);
                        if (this.withFriend == false && this.currentPlayer != this.pcPlayer) {
                            this.currentPlayer = (this.pcPlayer == 1 ? 1 : 2);
                        }

                    } else {
                        this.switchPlayer();
                        if (this.currentPlayer != this.pcPlayer) {
                            if (this.auth.isGuru == 0) {
                                this.isDisabled = false;
                            }
                        }
                        // if (this.currentPlayer == this.pcPlayer) {
                        //     const div = document.getElementById("disable-div");
                        //     div.style.pointerEvents = "none";
                        // } else {
                        //     const div = document.getElementById("disable-div");
                        //     div.style.removeProperty("pointer-events");
                        // }
                    }
                    if (this.muted == true) {
                        var snd = new Audio('./assets/sounds/mixkit-achievement-bell-600.wav')
                        snd.play();
                    }
                } else {
                    this.haveWinner = true;
                    this.winBox.forEach((box, index) => {
                        $(`#${box}`).delay(1000 + `${index}000`).addClass("zoom-in-zoom-out");
                    });
                    if (this.muted == true) {
                        var snd = new Audio('./assets/sounds/mixkit-males-yes-victory-2012.wav')
                        snd.play();
                    }
                }
            }
        },
        setItemWithFriend6: function (index) {
            if (this.board6[index] === "" && !this.haveWinner) {
                this.isDisabled = true;
                this.$set(this.board6, index, this.player[this.currentPlayer]);
                if ($('.column').css('background-color')) {
                    $(`.column`).css("background", 'none');
                }
                $(`#${index}`).delay(1000 + `1000`).css("background", 'yellow');
                // setTimeout(() => {
                //     $(`#${index}`).css("background", 'none');
                // }, 5000);
                if (!this.checkWin6(this.board6, this.player[this.currentPlayer])) {
                    if (this.board6.indexOf("") == "-1") {
                        this.draw = true;
                        socket.emit('play', {
                            index,
                            turn: this.currentPlayer,
                            to: this.oppoSocketID
                        });
                        this.nextLevelTimer = 5;
                        this.showNextLevelTimer = true;
                        const interval = setInterval(() => {
                            this.nextLevelTimer--;
                            if (this.nextLevelTimer === 0) {
                                clearInterval(interval);
                                this.showNextLevelTimer = false;
                                this.changeLevel();
                            }
                        }, 600);
                    } else {
                        socket.emit('play', {
                            index,
                            turn: this.currentPlayer,
                            to: this.oppoSocketID
                        });
                        if (this.currentPlayer == this.pcPlayer) {
                            //     const div = document.getElementById("disable-div");
                            //     div.style.pointerEvents = "none";
                            $('#myTurn').removeClass('turn-on-avatar');
                            $('#oppositeTurn').addClass('turn-on-avatar');
                        } else {
                            //     const div = document.getElementById("disable-div");
                            //     div.style.removeProperty("pointer-events");
                            $('#myTurn').addClass('turn-on-avatar');
                            $('#oppositeTurn').removeClass('turn-on-avatar');
                        }
                    }
                    if (this.muted == true) {
                        var snd = new Audio('/assets/sounds/mixkit-achievement-bell-600.wav');
                        snd.play();
                    }
                } else {
                    this.haveWinner = true;
                    if (this.muted == true) {
                        var snd = new Audio('./assets/sounds/mixkit-males-yes-victory-2012.wav')
                        snd.play();
                    }
                    this.winBox.forEach((box, index) => {
                        $(`#${box}`).delay(1000 + `${index}000`).addClass("zoom-in-zoom-out");
                    });
                    socket.emit('play', {
                        index,
                        turn: this.currentPlayer,
                        to: this.oppoSocketID
                    });
                }
            }
        },
        checkWin6: function (board6, player) {
            var stat6 = board6.map(function (x, i) {
                if (x === player) return i;
            }, this);
            for (let index6 = 0; index6 < this.winCombo6.length; index6++) {
                if (stat6.indexOf(this.winCombo6[index6][0]) !== -1 && stat6.indexOf(this.winCombo6[index6][
                    1]) !== -1 &&
                    stat6.indexOf(this.winCombo6[index6][2]) !== -1 && stat6.indexOf(this.winCombo6[index6][
                        3]) !== -1 &&
                    stat6.indexOf(this.winCombo6[index6][4]) !== -1 && stat6.indexOf(this.winCombo6[index6][
                        5]) !== -1) {
                    this.winBox = this.winCombo6[index6];
                    return true;
                };
            }
            return false;
        },
        // START 7X7 METHODS
        isFree7: function (pos) {
            return this.board7[pos] === "";
        },
        isPc7: function (pos) {
            return this.board7[pos] === this.player[this.pcPlayer];
        },
        isHu7: function (pos) {
            return this.board7[pos] !== "" && this.board7[pos] !== this.player[this.pcPlayer];
        },
        makePcMove7: function () {
            if (this.isFree7(24)) return this.setItem7(24);
            // check if Bot have four striks
            for (let win = 0; win < this.winCombo7.length; win++) {
                let [v, w, x, y, z] = this.winCombo7[win];
                if (this.board7[v] == this.botPlayer && this.board7[w] == this.botPlayer && this.board7[x] ==
                    this.botPlayer && this.board7[y] == this.botPlayer && this.board7[z] == "") {
                    return this.setItem7(z);
                }
                if (this.board7[v] == this.botPlayer && this.board7[w] == this.botPlayer && this.board7[x] ==
                    this.botPlayer && this.board7[z] == this.botPlayer && this.board7[y] == "") {
                    return this.setItem7(y);
                }
                if (this.board7[v] == this.botPlayer && this.board7[w] == this.botPlayer && this.board7[y] ==
                    this.botPlayer && this.board7[z] == this.botPlayer && this.board7[x] == "") {
                    return this.setItem7(x);
                }
                if (this.board7[v] == this.botPlayer && this.board7[x] == this.botPlayer && this.board7[y] ==
                    this.botPlayer && this.board7[z] == this.botPlayer && this.board7[w] == "") {
                    return this.setItem7(w);
                }
                if (this.board7[w] == this.botPlayer && this.board7[x] == this.botPlayer && this.board7[y] ==
                    this.botPlayer && this.board7[z] == this.botPlayer && this.board7[v] == "") {
                    return this.setItem7(v);
                }
            }
            // check if human have four striks
            for (let win = 0; win < this.winCombo7.length; win++) {
                let [a, b, c, d, e] = this.winCombo7[win];
                if (this.board7[a] == this.huPlayer && this.board7[b] == this.huPlayer && this.board7[c] == this
                    .huPlayer && this.board7[d] == this.huPlayer && this.board7[e] == "") {
                    return this.setItem7(e);
                }
                if (this.board7[a] == this.huPlayer && this.board7[b] == this.huPlayer && this.board7[c] == this
                    .huPlayer && this.board7[e] == this.huPlayer && this.board7[d] == "") {
                    return this.setItem7(d);
                }
                if (this.board7[a] == this.huPlayer && this.board7[b] == this.huPlayer && this.board7[d] == this
                    .huPlayer && this.board7[e] == this.huPlayer && this.board7[c] == "") {
                    return this.setItem7(c);
                }
                if (this.board7[a] == this.huPlayer && this.board7[c] == this.huPlayer && this.board7[d] == this
                    .huPlayer && this.board7[e] == this.huPlayer && this.board7[b] == "") {
                    return this.setItem7(b);
                }
                if (this.board7[b] == this.huPlayer && this.board7[c] == this.huPlayer && this.board7[d] == this
                    .huPlayer && this.board7[e] == this.huPlayer && this.board7[a] == "") {
                    return this.setItem7(a);
                }
            }
            // check for bot 3 strikes in full lenght and remaining all are free
            for (let win = 0; win < this.fullLenght7.length; win++) {
                let [a, b, c, d, e, f, g] = this.fullLenght7[win];

                if (this.board7[b] == this.botPlayer && this.board7[c] == this.botPlayer && this.board7[d] ==
                    this.botPlayer && this.board7[e] == "" && this.board7[f] == "") {
                    return this.setItem7(e);
                }
                if (this.board7[b] == "" && this.board7[c] == this.botPlayer && this.board7[d] == this
                    .botPlayer && this.board7[e] == this.botPlayer && this.board7[f] == "") {
                    return this.setItem7(b);
                }
                if (this.board7[b] == "" && this.board7[c] == "" && this.board7[d] == this.botPlayer && this
                    .board7[e] == this.botPlayer && this.board7[f] == this.botPlayer) {
                    return this.setItem7(c);
                }
                if (this.board7[b] == "" && this.board7[c] == this.botPlayer && this.board7[d] == "" && this
                    .board7[e] == this.botPlayer && this.board7[f] == this.botPlayer) {
                    return this.setItem7(d);
                }
                if (this.board7[b] == this.botPlayer && this.board7[c] == "" && this.board7[d] == this
                    .botPlayer && this.board7[e] == this.botPlayer && this.board7[f] == "") {
                    return this.setItem7(c);
                }
                if (this.board7[b] == this.botPlayer && this.board7[c] == this.botPlayer && this.board7[d] ==
                    "" && this.board7[e] == this.botPlayer && this.board7[f] == "") {
                    return this.setItem7(d);
                }
                if (this.board7[b] == "" && this.board7[c] == this.botPlayer && this.board7[d] == this
                    .botPlayer && this.board7[e] == "" && this.board7[f] == this.botPlayer) {
                    return this.setItem7(e);
                }
            }
            // check for opponent 3 strikes in full lenght and remaining all are free
            for (let win = 0; win < this.fullLenght7.length; win++) {
                let [a, b, c, d, e, f, g] = this.fullLenght7[win];

                if (this.board7[b] == this.huPlayer && this.board7[c] == this.huPlayer && this.board7[d] == this
                    .huPlayer && this.board7[e] == "" && this.board7[f] == "") {
                    return this.setItem7(e);
                }
                if (this.board7[b] == "" && this.board7[c] == this.huPlayer && this.board7[d] == this
                    .huPlayer && this.board7[e] == this.huPlayer && this.board7[f] == "") {
                    return this.setItem7(b);
                }
                if (this.board7[b] == "" && this.board7[c] == "" && this.board7[d] == this.huPlayer && this
                    .board7[e] == this.huPlayer && this.board7[f] == this.huPlayer) {
                    return this.setItem7(c);
                }
                if (this.board7[b] == "" && this.board7[c] == this.huPlayer && this.board7[d] == "" && this
                    .board7[e] == this.huPlayer && this.board7[f] == this.huPlayer) {
                    return this.setItem7(d);
                }
                if (this.board7[b] == this.huPlayer && this.board7[c] == "" && this.board7[d] == this
                    .huPlayer && this.board7[e] == this.huPlayer && this.board7[f] == "") {
                    return this.setItem7(c);
                }
                if (this.board7[b] == this.huPlayer && this.board7[c] == this.huPlayer && this.board7[d] ==
                    "" && this.board7[e] == this.huPlayer && this.board7[f] == "") {
                    return this.setItem7(d);
                }
                if (this.board7[b] == "" && this.board7[c] == this.huPlayer && this.board7[d] == this
                    .huPlayer && this.board7[e] == "" && this.board7[f] == this.huPlayer) {
                    return this.setItem7(e);
                }
            }
            // check for rebot 2 strikes
            for (let win = 0; win < this.fullLenght7.length; win++) {

                let [a, b, c, d, e, f, g, h] = this.fullLenght7[win];
                if (this.board7[a] == "" && this.board7[b] == "" && this.board7[c] == this.botPlayer && this
                    .board7[d] == this.botPlayer && this.board7[e] == "" && this.board7[f] == "" && this.board7[
                    g] == "" && this.board7[h] == "") {
                    return this.setItem7(e);
                }
                if (this.board7[a] == "" && this.board7[b] == "" && this.board7[c] == "" && this.board7[d] ==
                    "" && this.board7[e] == this.botPlayer && this.board7[f] == this.botPlayer && this.board7[
                    g] == "" && this.board7[h] == "") {
                    return this.setItem7(d);
                }
                if (this.board7[a] == "" && this.board7[b] == "" && this.board7[c] == "" && this.board7[d] ==
                    this.botPlayer && this.board7[e] == this.botPlayer && this.board7[f] == "" && this.board7[
                    g] == "" && this.board7[h] == "") {
                    return this.setItem7(f);
                }
            }
            for (let win = 0; win < this.winCombo7.length; win++) {
                let [a, b, c, d, e] = this.winCombo7[win];

                if (this.board7[a] == "" && this.board7[b] == this.huPlayer && this.board7[c] == this
                    .huPlayer && this.board7[d] == "" && this.board7[e] == "") {
                    return this.setItem7(d);
                }
                if (this.board7[a] == "" && this.board7[b] == this.huPlayer && this.board7[c] == "" && this
                    .board7[d] == this.huPlayer && this.board7[e] == "") {
                    return this.setItem7(c);
                }
                if (this.board7[a] == "" && this.board7[b] == "" && this.board7[c] == this.huPlayer && this
                    .board7[d] == this.huPlayer && this.board7[e] == "") {
                    return this.setItem7(b);
                }
                if (this.board7[a] == "" && this.board7[b] == "" && this.board7[c] == this.huPlayer && this
                    .board7[d] == "" && this.board7[e] == this.huPlayer) {
                    return this.setItem7(d);
                }
                if (this.board7[a] == "" && this.board7[b] == "" && this.board7[c] == "" && this.board7[d] ==
                    this.huPlayer && this.board7[e] == this.huPlayer) {
                    return this.setItem7(c);
                }
            }
            if (this.isFree7(30) || this.isFree7(32) || this.isFree7(16) || this.isFree7(18)) {
                const arr7 = [16, 18, 30, 32];
                let isCornerEmpty7 = true;
                const randomIndex7 = Math.floor(Math.random() * arr7.length);
                let item7 = arr7[randomIndex7];
                while (!this.isFree7(item7)) {
                    item7 = arr7[Math.floor(Math.random() * arr7.length)];
                }
                if (arr7.indexOf(item7) !== -1) {
                    arr7.splice(arr7.indexOf(item7), 1);
                    for (let index7 = 0; index7 < arr7.length; index7++) {
                        if (this.isFree7(arr7[index7])) {
                            isCornerEmpty7 = true;
                            break;
                        } else {
                            isCornerEmpty7 = false;
                        }
                    }
                }
                if (isCornerEmpty7 == true) {
                    return this.setItem7(item7);
                }
            }
            if (this.isFree7(17) || this.isFree7(23) || this.isFree7(25) || this.isFree7(31)) {
                const arr = [17, 23, 25, 31];
                const randomIndex = Math.floor(Math.random() * arr.length);
                let item = arr[randomIndex];
                while (!this.isFree7(item)) {
                    item = arr[Math.floor(Math.random() * arr.length)];
                }
                return this.setItem7(item);
            }
            if (this.isFree7(8) || this.isFree7(12) || this.isFree7(36) || this.isFree7(40)) {
                const arr7 = [8, 12, 36, 40];
                const randomIndex7 = Math.floor(Math.random() * arr7.length);
                let item7 = arr7[randomIndex7];
                while (!this.isFree7(item7)) {
                    item7 = arr7[Math.floor(Math.random() * arr7.length)];
                }
                return this.setItem7(item7);
            }
            if (this.isFree7(9) || this.isFree7(10) || this.isFree7(11) || this.isFree7(15) || this.isFree7(
                22) ||
                this.isFree7(29) || this.isFree7(19) || this.isFree7(26) || this.isFree7(33) || this.isFree7(
                    37) || this.isFree7(38) || this.isFree7(39)) {
                const arr7 = [9, 10, 11, 15, 22, 29, 19, 26, 33, 37, 38, 39];
                const randomIndex7 = Math.floor(Math.random() * arr7.length);
                let item7 = arr7[randomIndex7];
                while (!this.isFree7(item7)) {
                    item7 = arr7[Math.floor(Math.random() * arr7.length)];
                }
                return this.setItem7(item7);
            }

            if (this.isFree7(2) || this.isFree7(3) || this.isFree7(4) || this.isFree7(14) || this.isFree7(21) ||
                this.isFree7(28) || this.isFree7(20) || this.isFree7(27) || this.isFree7(34) || this.isFree7(
                    44) || this.isFree7(45) || this.isFree7(46)) {
                const arr7 = [2, 3, 4, 14, 21, 28, 20, 27, 34, 44, 45, 46];
                const randomIndex7 = Math.floor(Math.random() * arr7.length);
                let item7 = arr7[randomIndex7];
                while (!this.isFree7(item7)) {
                    item7 = arr7[Math.floor(Math.random() * arr7.length)];
                }
                return this.setItem7(item7);
            }
            if (this.isFree7(0) || this.isFree7(1) || this.isFree7(7) || this.isFree7(5) || this.isFree7(6) ||
                this.isFree7(13) || this.isFree7(35) || this.isFree7(42) || this.isFree7(43) || this.isFree7(
                    41) || this.isFree7(47) || this.isFree7(48)) {
                const arr7 = [0, 1, 7, 5, 6, 13, 35, 42, 43, 41, 47, 48];
                const randomIndex7 = Math.floor(Math.random() * arr7.length);
                let item7 = arr7[randomIndex7];
                while (!this.isFree7(item7)) {
                    item7 = arr7[Math.floor(Math.random() * arr7.length)];
                }
                return this.setItem7(item7);
            }
            if (this.board7.some(val => val === null || val === undefined || val === '')) {
                return this.setItem7(this.board7.findIndex(val => val === ""));
            }


        },
        makePcMoveGuru7: function () {
            if (this.isFree7(24)) return this.setItemWithFriend7(24);
            // check if human have four striks
            for (let win = 0; win < this.winCombo7.length; win++) {
                let [a, b, c, d, e] = this.winCombo7[win];
                if (this.board7[a] == this.huPlayer && this.board7[b] == this.huPlayer && this.board7[c] == this
                    .huPlayer && this.board7[d] == this.huPlayer && this.board7[e] == "") {
                    return this.setItemWithFriend7(e);
                }
                if (this.board7[a] == this.huPlayer && this.board7[b] == this.huPlayer && this.board7[c] == this
                    .huPlayer && this.board7[e] == this.huPlayer && this.board7[d] == "") {
                    return this.setItemWithFriend7(d);
                }
                if (this.board7[a] == this.huPlayer && this.board7[b] == this.huPlayer && this.board7[d] == this
                    .huPlayer && this.board7[e] == this.huPlayer && this.board7[c] == "") {
                    return this.setItemWithFriend7(c);
                }
                if (this.board7[a] == this.huPlayer && this.board7[c] == this.huPlayer && this.board7[d] == this
                    .huPlayer && this.board7[e] == this.huPlayer && this.board7[b] == "") {
                    return this.setItemWithFriend7(b);
                }
                if (this.board7[b] == this.huPlayer && this.board7[c] == this.huPlayer && this.board7[d] == this
                    .huPlayer && this.board7[e] == this.huPlayer && this.board7[a] == "") {
                    return this.setItemWithFriend7(a);
                }
            }
            // check if Bot have four striks
            for (let win = 0; win < this.winCombo7.length; win++) {
                let [v, w, x, y, z] = this.winCombo7[win];
                if (this.board7[v] == this.botPlayer && this.board7[w] == this.botPlayer && this.board7[x] ==
                    this.botPlayer && this.board7[y] == this.botPlayer && this.board7[z] == "") {
                    return this.setItemWithFriend7(z);
                }
                if (this.board7[v] == this.botPlayer && this.board7[w] == this.botPlayer && this.board7[x] ==
                    this.botPlayer && this.board7[z] == this.botPlayer && this.board7[y] == "") {
                    return this.setItemWithFriend7(y);
                }
                if (this.board7[v] == this.botPlayer && this.board7[w] == this.botPlayer && this.board7[y] ==
                    this.botPlayer && this.board7[z] == this.botPlayer && this.board7[x] == "") {
                    return this.setItemWithFriend7(x);
                }
                if (this.board7[v] == this.botPlayer && this.board7[x] == this.botPlayer && this.board7[y] ==
                    this.botPlayer && this.board7[z] == this.botPlayer && this.board7[w] == "") {
                    return this.setItemWithFriend7(w);
                }
                if (this.board7[w] == this.botPlayer && this.board7[x] == this.botPlayer && this.board7[y] ==
                    this.botPlayer && this.board7[z] == this.botPlayer && this.board7[v] == "") {
                    return this.setItemWithFriend7(v);
                }
            }
            // check for opponent 3 strikes in full lenght and remaining all are free
            for (let win = 0; win < this.fullLenght7.length; win++) {
                let [a, b, c, d, e, f, g] = this.fullLenght7[win];
                if (this.board7[b] == this.huPlayer && this.board7[c] == this.huPlayer && this.board7[d] == this
                    .huPlayer && this.board7[e] == "" && this.board7[f] == "") {
                    return this.setItemWithFriend7(e);
                }
                if (this.board7[b] == "" && this.board7[c] == this.huPlayer && this.board7[d] == this
                    .huPlayer && this.board7[e] == this.huPlayer && this.board7[f] == "") {
                    return this.setItemWithFriend7(b);
                }
                if (this.board7[b] == "" && this.board7[c] == "" && this.board7[d] == this.huPlayer && this
                    .board7[e] == this.huPlayer && this.board7[f] == this.huPlayer) {
                    return this.setItemWithFriend7(c);
                }
                if (this.board7[b] == "" && this.board7[c] == this.huPlayer && this.board7[d] == "" && this
                    .board7[e] == this.huPlayer && this.board7[f] == this.huPlayer) {
                    return this.setItemWithFriend7(d);
                }
                if (this.board7[b] == this.huPlayer && this.board7[c] == "" && this.board7[d] == this
                    .huPlayer && this.board7[e] == this.huPlayer && this.board7[f] == "") {
                    return this.setItemWithFriend7(c);
                }
                if (this.board7[b] == this.huPlayer && this.board7[c] == this.huPlayer && this.board7[d] ==
                    "" && this.board7[e] == this.huPlayer && this.board7[f] == "") {
                    return this.setItemWithFriend7(d);
                }
                if (this.board7[b] == "" && this.board7[c] == this.huPlayer && this.board7[d] == this
                    .huPlayer && this.board7[e] == "" && this.board7[f] == this.huPlayer) {
                    return this.setItemWithFriend7(e);
                }
            }
            // check for bot 3 strikes in full lenght and remaining all are free
            for (let win = 0; win < this.fullLenght7.length; win++) {
                let [a, b, c, d, e, f, g] = this.fullLenght7[win];
                if (this.board7[b] == this.botPlayer && this.board7[c] == this.botPlayer && this.board7[d] ==
                    this.botPlayer && this.board7[e] == "" && this.board7[f] == "") {
                    return this.setItemWithFriend7(e);
                }
                if (this.board7[b] == "" && this.board7[c] == this.botPlayer && this.board7[d] == this
                    .botPlayer && this.board7[e] == this.botPlayer && this.board7[f] == "") {
                    return this.setItemWithFriend7(b);
                }
                if (this.board7[b] == "" && this.board7[c] == "" && this.board7[d] == this.botPlayer && this
                    .board7[e] == this.botPlayer && this.board7[f] == this.botPlayer) {
                    return this.setItemWithFriend7(c);
                }
                if (this.board7[b] == "" && this.board7[c] == this.botPlayer && this.board7[d] == "" && this
                    .board7[e] == this.botPlayer && this.board7[f] == this.botPlayer) {
                    return this.setItemWithFriend7(d);
                }
                if (this.board7[b] == this.botPlayer && this.board7[c] == "" && this.board7[d] == this
                    .botPlayer && this.board7[e] == this.botPlayer && this.board7[f] == "") {
                    return this.setItemWithFriend7(c);
                }
                if (this.board7[b] == this.botPlayer && this.board7[c] == this.botPlayer && this.board7[d] ==
                    "" && this.board7[e] == this.botPlayer && this.board7[f] == "") {
                    return this.setItemWithFriend7(d);
                }
                if (this.board7[b] == "" && this.board7[c] == this.botPlayer && this.board7[d] == this
                    .botPlayer && this.board7[e] == "" && this.board7[f] == this.botPlayer) {
                    return this.setItemWithFriend7(e);
                }
            }
            // check for rebot 2 strikes
            for (let win = 0; win < this.fullLenght7.length; win++) {

                let [a, b, c, d, e, f, g, h] = this.fullLenght7[win];
                if (this.board7[a] == "" && this.board7[b] == "" && this.board7[c] == this.huPlayer && this
                    .board7[d] == this.huPlayer && this.board7[e] == "" && this.board7[f] == "" && this.board7[
                    g] == "" && this.board7[h] == "") {
                    return this.setItemWithFriend7(e);
                }
                if (this.board7[a] == "" && this.board7[b] == "" && this.board7[c] == "" && this.board7[d] ==
                    "" && this.board7[e] == this.huPlayer && this.board7[f] == this.huPlayer && this.board7[
                    g] == "" && this.board7[h] == "") {
                    return this.setItemWithFriend7(d);
                }
                if (this.board7[a] == "" && this.board7[b] == "" && this.board7[c] == "" && this.board7[d] ==
                    this.huPlayer && this.board7[e] == this.huPlayer && this.board7[f] == "" && this.board7[
                    g] == "" && this.board7[h] == "") {
                    return this.setItemWithFriend7(f);
                }
            }
            for (let win = 0; win < this.winCombo7.length; win++) {
                let [a, b, c, d, e] = this.winCombo7[win];

                if (this.board7[a] == "" && this.board7[b] == this.botPlayer && this.board7[c] == this
                    .botPlayer && this.board7[d] == "" && this.board7[e] == "") {
                    return this.setItemWithFriend7(d);
                }
                if (this.board7[a] == "" && this.board7[b] == this.botPlayer && this.board7[c] == "" && this
                    .board7[d] == this.botPlayer && this.board7[e] == "") {
                    return this.setItemWithFriend7(c);
                }
                if (this.board7[a] == "" && this.board7[b] == "" && this.board7[c] == this.botPlayer && this
                    .board7[d] == this.botPlayer && this.board7[e] == "") {
                    return this.setItemWithFriend7(b);
                }
                if (this.board7[a] == "" && this.board7[b] == "" && this.board7[c] == this.botPlayer && this
                    .board7[d] == "" && this.board7[e] == this.botPlayer) {
                    return this.setItemWithFriend7(d);
                }
                if (this.board7[a] == "" && this.board7[b] == "" && this.board7[c] == "" && this.board7[d] ==
                    this.botPlayer && this.board7[e] == this.botPlayer) {
                    return this.setItemWithFriend7(c);
                }
            }
            if (this.isFree7(30) || this.isFree7(32) || this.isFree7(16) || this.isFree7(18)) {
                const arr7 = [16, 18, 30, 32];
                let isCornerEmpty7 = true;
                const randomIndex7 = Math.floor(Math.random() * arr7.length);
                let item7 = arr7[randomIndex7];
                while (!this.isFree7(item7)) {
                    item7 = arr7[Math.floor(Math.random() * arr7.length)];
                }
                if (arr7.indexOf(item7) !== -1) {
                    arr7.splice(arr7.indexOf(item7), 1);
                    for (let index7 = 0; index7 < arr7.length; index7++) {
                        if (this.isFree7(arr7[index7])) {
                            isCornerEmpty7 = true;
                            break;
                        } else {
                            isCornerEmpty7 = false;
                        }
                    }
                }
                if (isCornerEmpty7 == true) {
                    return this.setItemWithFriend7(item7);
                }
            }

            if (this.isFree7(17) || this.isFree7(23) || this.isFree7(25) || this.isFree7(31)) {
                const arr = [17, 23, 25, 31];
                const randomIndex = Math.floor(Math.random() * arr.length);
                let item = arr[randomIndex];
                while (!this.isFree7(item)) {
                    item = arr[Math.floor(Math.random() * arr.length)];
                }
                return this.setItemWithFriend7(item);
            }
            if (this.isFree7(8) || this.isFree7(12) || this.isFree7(36) || this.isFree7(40)) {
                const arr7 = [8, 12, 36, 40];
                const randomIndex7 = Math.floor(Math.random() * arr7.length);
                let item7 = arr7[randomIndex7];
                while (!this.isFree7(item7)) {
                    item7 = arr7[Math.floor(Math.random() * arr7.length)];
                }
                return this.setItemWithFriend7(item7);
            }
            if (this.isFree7(9) || this.isFree7(10) || this.isFree7(11) || this.isFree7(15) || this.isFree7(
                22) ||
                this.isFree7(29) || this.isFree7(19) || this.isFree7(26) || this.isFree7(33) || this.isFree7(
                    37) || this.isFree7(38) || this.isFree7(39)) {
                const arr7 = [9, 10, 11, 15, 22, 29, 19, 26, 33, 37, 38, 39];
                const randomIndex7 = Math.floor(Math.random() * arr7.length);
                let item7 = arr7[randomIndex7];
                while (!this.isFree7(item7)) {
                    item7 = arr7[Math.floor(Math.random() * arr7.length)];
                }
                return this.setItemWithFriend7(item7);
            }

            if (this.isFree7(2) || this.isFree7(3) || this.isFree7(4) || this.isFree7(14) || this.isFree7(21) ||
                this.isFree7(28) || this.isFree7(20) || this.isFree7(27) || this.isFree7(34) || this.isFree7(
                    44) || this.isFree7(45) || this.isFree7(46)) {
                const arr7 = [2, 3, 4, 14, 21, 28, 20, 27, 34, 44, 45, 46];
                const randomIndex7 = Math.floor(Math.random() * arr7.length);
                let item7 = arr7[randomIndex7];
                while (!this.isFree7(item7)) {
                    item7 = arr7[Math.floor(Math.random() * arr7.length)];
                }
                return this.setItemWithFriend7(item7);
            }
            if (this.isFree7(0) || this.isFree7(1) || this.isFree7(7) || this.isFree7(5) || this.isFree7(6) ||
                this.isFree7(13) || this.isFree7(35) || this.isFree7(42) || this.isFree7(43) || this.isFree7(
                    41) || this.isFree7(47) || this.isFree7(48)) {
                const arr7 = [0, 1, 7, 5, 6, 13, 35, 42, 43, 41, 47, 48];
                const randomIndex7 = Math.floor(Math.random() * arr7.length);
                let item7 = arr7[randomIndex7];
                while (!this.isFree7(item7)) {
                    item7 = arr7[Math.floor(Math.random() * arr7.length)];
                }
                return this.setItemWithFriend7(item7);
            }
            if (this.board7.some(val => val === null || val === undefined || val === '')) {
                return this.setItemWithFriend7(this.board7.findIndex(val => val === ""));
            }
        },
        setItem7: function (index) {
            if (this.level == 5) {
                this.lastLevelTimer = 2;
                clearInterval(this.lastInterval);
            }
            if (this.board7[index] === "" && !this.haveWinner) {
                this.isDisabled = true;
                this.$set(this.board7, index, this.player[this.currentPlayer]);
                if ($('.column').css('background-color')) {
                    $(`.column`).css("background", 'none');
                }
                $(`#${index}`).delay(1000 + `1000`).css("background", 'yellow');
                if (!this.checkWin7(this.board7, this.player[this.currentPlayer])) {
                    if (this.board7.indexOf("") == "-1") {
                        this.draw = true;
                        if (this.muted == true) {
                            var snd = new Audio('./assets/sounds/mixkit-ethereal-fairy-win-sound-2019.wav')
                            snd.play();
                        }
                        this.nextLevelTimer = 5;
                        this.showNextLevelTimer = true;
                        if (this.level < 5) {
                            this.showNextLevelTimer = true;
                            const interval = setInterval(() => {
                                this.nextLevelTimer--;
                                if (this.nextLevelTimer === 0) {
                                    clearInterval(interval);
                                    this.showNextLevelTimer = false;
                                    this.board7.fill("");
                                    this.level++;
                                    this.draw = false;
                                    this.switchPlayer();
                                }
                            }, 600);
                        }
                        setTimeout(() => {
                            if (this.withFriend == false) {
                                this.isDisabled = false;
                                this.currentPlayer = this.pcPlayer == 1 ? 2 : 1;
                            }
                        }, 1000);

                    } else {
                        this.switchPlayer();
                        if (this.currentPlayer != this.pcPlayer) {
                            if (this.auth.isGuru == 0) {
                                this.isDisabled = false;
                            }
                        }
                        if (this.level == 5) {
                            this.lastInterval = setInterval(() => {
                                this.showLastLevelTimer = true;
                                this.lastLevelTimer--;
                                if (this.lastLevelTimer == 0) {
                                    clearInterval(this.lastInterval);
                                    // this.showLastLevelTimer = false;
                                    this.switchPlayer();
                                }
                            }, 1000);
                        }
                    }
                    if (this.muted == true) {
                        var snd = new Audio('./assets/sounds/mixkit-achievement-bell-600.wav')
                        snd.play();
                    }
                } else {
                    this.haveWinner = true;
                    this.winBox.forEach((box, index) => {
                        $(`#${box}`).delay(1000 + `${index}000`).addClass("zoom-in-zoom-out");
                    });
                    if (this.muted == true) {
                        var snd = new Audio('./assets/sounds/mixkit-males-yes-victory-2012.wav')
                        snd.play();
                    }
                }
            }
        },
        resetInterval(index) {
            if (this.isFree7(index)) {
                clearInterval(this.lastInterval);
                // this.showLastLevelTimer = false;
                socket.emit('req-timer-reset', this.oppoSocketID)
            }
        },
        setItemWithFriend7: function (index) {
            this.lastLevelTimer = 2;
            // clearInterval(this.lastInterval);
            if (this.board7[index] === "" && !this.haveWinner) {
                this.isDisabled = true;
                this.$set(this.board7, index, this.player[this.currentPlayer]);
                if ($('.column').css('background-color')) {
                    $(`.column`).css("background", 'none');
                }
                $(`#${index}`).delay(1000 + `1000`).css("background", 'yellow');
                if (!this.checkWin7(this.board7, this.player[this.currentPlayer])) {
                    if (this.board7.indexOf("") == "-1") {
                        this.draw = true;
                        socket.emit('play', {
                            index,
                            turn: this.currentPlayer,
                            to: this.oppoSocketID
                        });
                        this.nextLevelTimer = 5;
                        this.showNextLevelTimer = true;
                        if (this.level < 5) {
                            // this.showLastLevelTimer = false;
                            const interval = setInterval(() => {
                                this.nextLevelTimer--;
                                if (this.nextLevelTimer === 0) {
                                    clearInterval(interval);
                                    this.showNextLevelTimer = false;
                                    this.board7.fill("");
                                    this.changeLevel();
                                }
                            }, 600);
                        }
                    } else {
                        socket.emit('play', {
                            index,
                            turn: this.currentPlayer,
                            to: this.oppoSocketID
                        });
                        if (this.currentPlayer == this.pcPlayer) {
                            $('#myTurn').removeClass('turn-on-avatar');
                            $('#oppositeTurn').addClass('turn-on-avatar');
                        } else {
                            $('#myTurn').addClass('turn-on-avatar');
                            $('#oppositeTurn').removeClass('turn-on-avatar');
                        }

                        if (this.level == 5) {
                            if (this.lastInterval > 0) {
                                clearInterval(this.lastInterval);
                                this.lastLevelTimer = 2;
                            }
                            this.lastInterval = setInterval(() => {
                                this.showLastLevelTimer = true;
                                if (this.lastLevelTimer == 0) {
                                    clearInterval(this.lastInterval);
                                    // this.showLastLevelTimer = false;
                                    if (this.currentPlayer == this.pcPlayer) {
                                        if (this.draw == false || this.haveWinner == false) {

                                            var temp = Math.floor(Math.random() * 49);
                                            while (!this.isFree7(temp)) {
                                                temp = Math.floor(Math.random() * 49);
                                            }
                                            this.setItemWithFriend7(temp);
                                            // this.switchPlayer();
                                            clearInterval(this.lastInterval);
                                            if (this.auth.isGuru == 0) {
                                                this.isDisabled = true;
                                            }
                                            socket.emit('change-turn-timeout', this.oppoSocketID)
                                            this.lastLevelTimer = 2;
                                            this.lastInterval = setInterval(() => {
                                                this.lastLevelTimer--;
                                                if (this.lastLevelTimer == 0) {
                                                    clearInterval(this.lastInterval);
                                                    return;
                                                }

                                            }, 800);
                                        }
                                    }
                                    return;
                                }
                                this.lastLevelTimer--;
                            }, 800);
                        }

                    }
                    if (this.muted == true) {
                        var snd = new Audio('/assets/sounds/mixkit-achievement-bell-600.wav');
                        snd.play();
                    }
                } else {
                    this.haveWinner = true;
                    if (this.muted == true) {
                        var snd = new Audio('./assets/sounds/mixkit-males-yes-victory-2012.wav')
                        snd.play();
                    }
                    this.winBox.forEach((box, index) => {
                        $(`#${box}`).delay(1000 + `${index}000`).addClass("zoom-in-zoom-out");
                    });
                    socket.emit('play', {
                        index,
                        turn: this.currentPlayer,
                        to: this.oppoSocketID
                    });
                    // this.showLastLevelTimer = false;
                }
            }
        },
        setItemWithFriend7OnlyWhenTimer: function (index) {
            this.lastLevelTimer = 2;
            // clearInterval(this.lastInterval);
            if (this.board7[index] === "" && !this.haveWinner) {
                this.isDisabled = true;
                this.$set(this.board7, index, this.player[this.currentPlayer]);
                if ($('.column').css('background-color')) {
                    $(`.column`).css("background", 'none');
                }
                $(`#${index}`).delay(1000 + `1000`).css("background", 'yellow');
                if (!this.checkWin7(this.board7, this.player[this.currentPlayer])) {
                    if (this.board7.indexOf("") == "-1") {
                        this.draw = true;
                        socket.emit('play', {
                            index,
                            turn: this.currentPlayer,
                            to: this.oppoSocketID
                        });
                        this.nextLevelTimer = 5;
                        this.showNextLevelTimer = true;
                        if (this.level < 5) {
                            // this.showLastLevelTimer = false;
                            const interval = setInterval(() => {
                                this.nextLevelTimer--;
                                if (this.nextLevelTimer === 0) {
                                    clearInterval(interval);
                                    this.showNextLevelTimer = false;
                                    this.board7.fill("");
                                    this.changeLevel();
                                    // this.level++;
                                    // this.draw = false;
                                    // this.switchPlayer();
                                }
                            }, 600);
                        }
                    } else {
                        socket.emit('play', {
                            index,
                            turn: this.currentPlayer,
                            to: this.oppoSocketID
                        });
                        if (this.currentPlayer == this.pcPlayer) {
                            $('#myTurn').removeClass('turn-on-avatar');
                            $('#oppositeTurn').addClass('turn-on-avatar');
                        } else {
                            $('#myTurn').addClass('turn-on-avatar');
                            $('#oppositeTurn').removeClass('turn-on-avatar');
                        }

                    }
                    if (this.muted == true) {
                        var snd = new Audio('/assets/sounds/mixkit-achievement-bell-600.wav');
                        snd.play();
                    }
                } else {
                    this.haveWinner = true;
                    if (this.muted == true) {
                        var snd = new Audio('./assets/sounds/mixkit-males-yes-victory-2012.wav')
                        snd.play();
                    }
                    this.winBox.forEach((box, index) => {
                        $(`#${box}`).delay(1000 + `${index}000`).addClass("zoom-in-zoom-out");
                    });
                    socket.emit('play', {
                        index,
                        turn: this.currentPlayer,
                        to: this.oppoSocketID
                    });
                    // this.showLastLevelTimer = false;
                }
            }
        },
        checkWin7: function (board7, player) {
            var stat7 = board7.map(function (x, i) {
                if (x === player) return i;
            }, this);
            for (let index7 = 0; index7 < this.winCombo7.length; index7++) {
                if (stat7.indexOf(this.winCombo7[index7][0]) !== -1 && stat7.indexOf(this.winCombo7[index7][
                    1]) !== -1 &&
                    stat7.indexOf(this.winCombo7[index7][2]) !== -1 && stat7.indexOf(this.winCombo7[index7][
                        3]) !== -1 &&
                    stat7.indexOf(this.winCombo7[index7][4]) !== -1 && stat7.indexOf(this.winCombo7[index7][
                        5]) !== -1 && stat7.indexOf(this.winCombo7[index7][6]) !== -1) {
                    this.winBox = this.winCombo7[index7];
                    return true;
                };
            }
            return false;
        },
    },
    beforeRouteLeave(to, from, next) {
        if (this.canLeave) {
            const result = window.confirm('Are you sure you want to leave?')
            if (result) {
                this.canLeave = true;
                this.leaveRoom()
                next()
            } else {
                next(false)
            }
        } else {
            next(true);
        }
    }
};
</script>
<style scoped>
.zoom-in-zoom-out svg {
    /* margin: 24px; */
    /* width: 50px; */
    /* height: 50px; */
    animation: zoom-in-zoom-out 2s ease-out infinite;
}

@keyframes zoom-in-zoom-out {
    0% {
        transform: scale(1, 1);
    }

    50% {
        transform: scale(1.5, 1.5);
    }

    100% {
        transform: scale(1, 1);
    }
}

.bounce svg {
    display: inline-block;
    position: relative;
    -moz-animation: bounce 0.5s infinite linear;
    -o-animation: bounce 0.5s infinite linear;
    -webkit-animation: bounce 0.5s infinite linear;
    animation: bounce 0.5s infinite linear;
    color: #027bdd;
}

@-webkit-keyframes bounce {
    0% {
        top: 0;
    }

    50% {
        top: -0.2em;
    }

    70% {
        top: -0.3em;
    }

    100% {
        top: 0;
    }
}

@-moz-keyframes bounce {
    0% {
        top: 0;
    }

    50% {
        top: -0.2em;
    }

    70% {
        top: -0.3em;
    }

    100% {
        top: 0;
    }
}

@-o-keyframes bounce {
    0% {
        top: 0;
    }

    50% {
        top: -0.2em;
    }

    70% {
        top: -0.3em;
    }

    100% {
        top: 0;
    }
}

@-ms-keyframes bounce {
    0% {
        top: 0;
    }

    50% {
        top: -0.2em;
    }

    70% {
        top: -0.3em;
    }

    100% {
        top: 0;
    }
}

@keyframes bounce {
    0% {
        top: 0;
    }

    50% {
        top: -0.2em;
    }

    70% {
        top: -0.3em;
    }

    100% {
        top: 0;
    }
}

/* 11x11 */
.board11 .cell {
    height: 7vh;
    transition: .4s ease;
    border-right: 4px solid #000000;
    border-bottom: 4px solid #000000;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    font-weight: 200;
    padding: 0;
}

.board11 .cell:nth-child(1n+111) {
    border-bottom: 0;
}

.board11 .cell:nth-child(11n) {
    border-right: 0;
}

.column.is-12,
.column.is-12-tablet {
    width: 9% !important;
}

/* 5x5 */
.board5 .cell {
    height: 8vh;
    transition: .4s ease;
    border-right: 8px solid #000000;
    border-bottom: 8px solid #000000;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    font-weight: 200;
    padding: 0;
}

.board5 .cell:nth-child(1n+21) {
    border-bottom: 0;
}

.board5 .cell:nth-child(5n) {
    border-right: 0;
}

.column.is-6,
.column.is-6-tablet {
    width: 18.66666% !important;
}

/* 9x9 */
.board7 .cell {
    height: 8vh;
    transition: .4s ease;
    border-right: 8px solid #000000;
    border-bottom: 8px solid #000000;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    font-weight: 200;
    padding: 0;
}

.board7 .cell:nth-child(1n+43) {
    border-bottom: 0;
}

.board7 .cell:nth-child(7n) {
    border-right: 0;
}

.column.is-8,
.column.is-8-tablet {
    width: 14% !important;
}

/* 6x6 */
.board6 .cell {
    height: 85px;
    transition: .4s ease;
    border-right: 8px solid #000000;
    border-bottom: 8px solid #000000;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    font-weight: 200;
    padding: 0;
}

.board6 .cell:nth-child(1n+31) {
    border-bottom: 0;
}

.board6 .cell:nth-child(6n) {
    border-right: 0;
}

.column.is-7,
.column.is-7-tablet {
    width: 16.66666% !important;
}

.game-three-by-three {
    max-width: 530px;
    margin: auto;
}

.columns.is-mobile>.column.is-6 {
    width: 33.3333%;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s ease-in;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
    {
    opacity: 0;
}

.board {
    margin-top: 40px;
    font-family: 'Crafty Girls', cursive;
}

.board .cell {
    height: 125px;
    transition: .4s ease;
    border-right: 8px solid #000000;
    border-bottom: 8px solid #000000;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    font-weight: 200;
}

.board .cell:nth-child(3n) {
    border-right: 0;
}

.board .cell:nth-child(1n+7) {
    border-bottom: 0;
}

.column.is-4,
.column.is-4-tablet {
    width: 30.66666% !important;
}

.resultMsg {
    margin-top: 40px;
    font-size: 3rem;
    font-weight: 400;
    border-radius: 45px;
    animation: fadeIn .2s 1 forwards ease-in;
    opacity: 0;
    transform: scale(0);
}

.resultMsgTurn {
    margin-top: 40px;
    font-size: 3rem;
    font-weight: 400;
    border-radius: 45px;
    animation: fadeIn .2s 1 forwards ease-in;
    opacity: 0;
    transform: scale(0);
}

.resultMsg.is-success,
.resultMsg.is-warning {

    max-width: 325px;
    margin: 0px auto 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}



@keyframes fadeIn {

    to {
        opacity: 1;
        transform: scale(1);
    }

}

.bounce-enter-active {
    animation: bounce-in .5s;
}

.bounce-leave-active {
    animation: bounce-out .5s;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.5);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes bounce-out {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.5);
    }

    100% {
        transform: scale(0);
    }
}

@media only screen and (max-width:480px) {
    .board11 .cell {
        height: 5vh;
    }

    .board9 .cell {
        height: 5.5vh;
    }

    .choose-symbol {
        padding-top: 120px;
    }

    .close-icon {
        position: absolute;
        top: 3.5rem;
        right: 0.5rem;
        z-index: 9999;
    }

    .board .cell {
        height: 90px;
        padding: 0px;
    }

    .main-min-height-100 {
        min-height: 100%;
        padding-bottom: 50px;
    }

    .game-users {
        margin-bottom: 50px;
    }

    .board6 .cell {
        height: 90px;
    }

    .board6 .cell {
        height: 7vh;
        border-right: 5px solid #000000;
        border-bottom: 5px solid #000000;
    }

    .tooltips .tooltiptexts {
        top: 10%;
        left: -271%;
        margin-left: -60px;

    }
}

.disable-board {
    pointer-events: none;
}

.enable-board {
    pointer-events: auto;
}

.resultMsg.is-success {
    background: #eee;
    z-index: 1;
    padding: 5px 15px;
    max-width: 600px;
    margin: 0 auto 0px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.resultMsg.is-warning {
    background: #eee;
    z-index: 1;
    padding: 5px 15px;
    max-width: 600px;
    margin: 0 auto 0px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.resultMsgTurn.is-warning {

    padding: 0px 15px;
    max-width: 550px;
    margin: 0 auto 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.result-message {
    position: absolute;
    top: 58%;
    left: 50%;
    transform: translate(-50%, -48%);
}

@media screen and (max-width: 600px) {
    .resultMsg {
        margin-top: 40px;
        font-size: 2rem;
    }
}
</style>