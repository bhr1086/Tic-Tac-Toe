<template>
    <section class="section" id="tictac">
        <div class="container">
            <div class="columns">
                <div class="column">

                </div>
                <div class="column has-text-centered">
                    <h1 class="title">Tic Tac Toe</h1>
                    <div class="block"> </div>

                    <transition name="bounce">
                        <div class="" v-if="start">
                            <a class="button is-outlined" @click="generateRandomRoom()">Play with friend</a>
                            <a class="button is-outlined" @click="addSecondUser()">second player</a>
                            <a class="button is-outlined" @click="twoPlayers">Human VS Human</a>
                            <a class="button is-outlined" @click="onePlayer">Human VS Ai</a>
                        </div>
                    </transition>

                    <transition name="bounce">
                        <div class="" v-if="showChoose">
                            <h4 class="subtitle">Player 1 choose your simbol</h4>
                            <a class="button  is-outlined" @click="setPlayerOne(1)">O</a>
                            <a class="button  is-outlined" @click="setPlayerOne(2)">X</a>
                        </div>
                    </transition>

                    <transition name="bounce" v-if="withFriend == false">
                        <div>
                            <div class="board has-text-centered columns is-multiline is-mobile" v-if="run">
                                <div v-for="(item, index) in board" :key="index" class="column is-6 cell" @click="setItem(index)">{{ item }}</div>
                            </div>
                            <div class="block"> </div>
                            <div class="" v-if="twoHumans && run">
                                Turn: {{ player[currentPlayer] }}
                            </div>
                        </div>
                    </transition>
                    <transition name="bounce" v-else>
                        <div id="disable-div">
                            <div class="board has-text-centered columns is-multiline is-mobile" v-if="run">
                                <div v-for="(item, index) in board" :key="index" class="column is-6 cell" @click="setItemWithFriend(index)">{{ item }}</div>
                            </div>
                            <div class="block"> </div>
                            <div class="" v-if="twoHumans && run">
                                Turn: {{ player[currentPlayer] }}
                            </div>
                        </div>
                    </transition>


                    <div class="resultMsg is-success" v-if="haveWinner">
                        "{{ player[currentPlayer] }}" Wins!
                    </div>
                    <div class="resultMsg is-warning" v-if="draw">
                        Draw!
                    </div>

                    <div class="block"> </div>

                    <transition name="bounce">
                        <div class="" v-if="draw || haveWinner">
                            <a class="button is-outlined" @click="continueGame">Continue</a>
                            <a class="button is-outlined" @click="newGame">New Game</a>
                        </div>
                    </transition>

                </div>
                <div class="column">

                </div>
            </div>
        </div>
    </section>
</template>
<script>
import io from 'socket.io-client';
const socket = io("http://localhost:3000");
import axios from 'axios';

export default {
    data() {
        return {
            board: ["", "", "",
                "", "", "",
                "", "", ""
            ],
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
            currentPlayer: 1,
            player: {
                1: "O",
                2: "X"
            },
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
        }
    },
    created() {
        socket.on('roomFull', (error) => {
            // this.$router.push('/roomFull')
            this.$router.push({ path: '/room-full' })
        });
        if(this.$route.params.id){
            this.addSecondUser(this.$route.params.id);
        }
        socket.on("play", (index) => {
            console.log("vue created and play game", index)
            this.setItemWithFriend(index);
        })
        // socket.on('roomJoinSuccess', (message) => {
        //     console.log(message);
        // });
    },
    mounted: function () {
        // this.checkPcTurn();
    },
    watch: {
        currentPlayer: function () {
            this.checkPcTurn();
        },
        run: function () {
            this.checkPcTurn();
        }
    },
    methods: {
        generateRandomRoom(){
            this.roomID = Math.floor(Math.random()*(999-100+1)+100);
            let userID = Math.floor(Math.random()*(999-100+1)+100);
            this.twoHumans = true;
            this.showChoose = true;
            this.start = false;
            this.withFriend = true;
            socket.emit('join', {roomID:this.roomID,userID:this.user+userID,turn:this.currentPlayer});
        },
        addSecondUser(room_id){
            // this.roomID = Math.floor(Math.random()*(999-100+1)+100);
            let userID = Math.floor(Math.random()*(999-100+1)+100);
            socket.emit('join', {roomID:room_id,userID:this.user+userID});
            this.twoHumans = true;
            this.showChoose = true;
            this.start = false;
            this.withFriend = true;

        },
        // playWithFriend(){
        //     socket.on("play", (index) => {
        //         console.log("vue created and play game", index)
        //         this.setItemWithFriend(index);
        //     })
        // },
        continueGame: function () {
            this.board.fill("");
            this.haveWinner = false;
            this.draw = false;
            this.currentPlayer = 1;
            this.run = true;
            this.checkPcTurn();
            return;
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
            // return this.checkPcTurn();
            return;
        },
        twoPlayers: function () {
            this.twoHumans = true;
            this.showChoose = true;
            this.start = false;
        },
        onePlayer: function () {
            this.showChoose = true;
            this.start = false;
        },
        setPlayerOne: function (x) {
            // console.log(x);
            if(this.withFriend == true){
                this.friendOne = this.player[x];
                this.friendTwo = this.friendOne == 'X' ? 'O' : 'X';
            }
            this.pcPlayer = x;
            this.showChoose = false;
            this.run = true;
        },
        checkPcTurn: function () {
            if (this.currentPlayer === this.pcPlayer && !this.twoHumans && this.run == true) {
                return this.makePcMove();
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


            if (this.isPc(0) && this.isPc(2) && this.isFree(1)) return this.setItem(
            1); // riempi centrali con angoli pieni
            if (this.isPc(0) && this.isPc(6) && this.isFree(3)) return this.setItem(3);
            if (this.isPc(2) && this.isPc(8) && this.isFree(5)) return this.setItem(5);
            if (this.isPc(6) && this.isPc(8) && this.isFree(7)) return this.setItem(7);

            if (this.isPc(4) && this.isPc(2) && this.isFree(6)) return this.setItem(6); //riempi croci
            if (this.isPc(4) && this.isPc(0) && this.isFree(8)) return this.setItem(8);
            if (this.isPc(4) && this.isPc(6) && this.isFree(2)) return this.setItem(2);
            if (this.isPc(4) && this.isPc(8) && this.isFree(0)) return this.setItem(0);

            if (this.isPc(0) && this.isPc(1) && this.isFree(2)) return this.setItem(2); //riempi doppie orizzontali
            if (this.isPc(1) && this.isPc(2) && this.isFree(0)) return this.setItem(0);
            if (this.isPc(3) && this.isPc(4) && this.isFree(5)) return this.setItem(5);
            if (this.isPc(4) && this.isPc(5) && this.isFree(3)) return this.setItem(3);
            if (this.isPc(6) && this.isPc(7) && this.isFree(8)) return this.setItem(8);
            if (this.isPc(7) && this.isPc(8) && this.isFree(6)) return this.setItem(6);

            if (this.isPc(0) && this.isPc(3) && this.isFree(6)) return this.setItem(6); //riempi doppie verticali
            if (this.isPc(3) && this.isPc(6) && this.isFree(0)) return this.setItem(0);
            if (this.isPc(1) && this.isPc(4) && this.isFree(7)) return this.setItem(7);
            if (this.isPc(4) && this.isPc(7) && this.isFree(1)) return this.setItem(1);
            if (this.isPc(2) && this.isPc(5) && this.isFree(8)) return this.setItem(8);
            if (this.isPc(5) && this.isPc(8) && this.isFree(2)) return this.setItem(2);

            if (this.isHu(4) && this.isHu(2) && this.isFree(6)) return this.setItem(6); //blocco croci
            if (this.isHu(4) && this.isHu(0) && this.isFree(8)) return this.setItem(8);
            if (this.isHu(4) && this.isHu(6) && this.isFree(2)) return this.setItem(2);
            if (this.isHu(4) && this.isHu(8) && this.isFree(0)) return this.setItem(0);

            if (this.isHu(0) && this.isHu(2) && this.isFree(1)) return this.setItem(1); // blocco centrale con angoli pieni
            if (this.isHu(0) && this.isHu(6) && this.isFree(3)) return this.setItem(3);
            if (this.isHu(2) && this.isHu(8) && this.isFree(5)) return this.setItem(5);
            if (this.isHu(6) && this.isHu(8) && this.isFree(7)) return this.setItem(7);

            if (this.isHu(0) && this.isHu(1) && this.isFree(2)) return this.setItem(2); //blocco doppie orizzontali
            if (this.isHu(1) && this.isHu(2) && this.isFree(0)) return this.setItem(0);
            if (this.isHu(3) && this.isHu(4) && this.isFree(5)) return this.setItem(5);
            if (this.isHu(4) && this.isHu(5) && this.isFree(3)) return this.setItem(3);
            if (this.isHu(6) && this.isHu(7) && this.isFree(8)) return this.setItem(8);
            if (this.isHu(7) && this.isHu(8) && this.isFree(6)) return this.setItem(6);

            if (this.isHu(0) && this.isHu(3) && this.isFree(6)) return this.setItem(6); //blocco doppie verticali
            if (this.isHu(3) && this.isHu(6) && this.isFree(0)) return this.setItem(0);
            if (this.isHu(1) && this.isHu(4) && this.isFree(7)) return this.setItem(7);
            if (this.isHu(4) && this.isHu(7) && this.isFree(1)) return this.setItem(1);
            if (this.isHu(2) && this.isHu(5) && this.isFree(8)) return this.setItem(8);
            if (this.isHu(5) && this.isHu(8) && this.isFree(2)) return this.setItem(2);

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
        setItemWithFriend: function (index) {
            if (this.board[index] === "" && !this.haveWinner) {
                this.$set(this.board, index, this.player[this.currentPlayer]);
                if (!this.checkWin(this.board, this.player[this.currentPlayer])) {
                    if (this.board.indexOf("") == "-1") {
                        socket.emit('play', index);
                        this.draw = true;
                    } else {
                        this.switchPlayer();
                        socket.emit('play', index);
                    }
                } 
                else {
                    socket.emit('play', index);
                    this.haveWinner = true;
                }
            }
        },
        setItem: function (index) {
            if (this.board[index] === "" && !this.haveWinner) {
                this.$set(this.board, index, this.player[this.currentPlayer]);
                if (!this.checkWin(this.board, this.player[this.currentPlayer])) {
                    if (this.board.indexOf("") == "-1") {
                        this.draw = true;
                    } else {
                        this.switchPlayer();
                    }
                } 
                else {
                    this.haveWinner = true;
                }
            }
        },
        switchPlayer: function () {
            if(this.withFriend == true){
                if (this.currentPlayer === 1) {
                    if(this.currentPlayer != this.pcPlayer){
                        const div = document.getElementById("disable-div");
                        div.style.opacity = "0.5";
                        div.style.pointerEvents = "none";
                    }else{
                        const div = document.getElementById("disable-div");
                        div.style.removeProperty("opacity");
                        div.style.removeProperty("pointer-events");
                    }
                    return this.currentPlayer = 2;
                }
                if (this.currentPlayer === 2) {
                    if(this.currentPlayer != this.pcPlayer){
                        const div = document.getElementById("disable-div");
                        div.style.opacity = "0.5";
                        div.style.pointerEvents = "none";
                    }else{
                        const div = document.getElementById("disable-div");
                        div.style.removeProperty("opacity");
                        div.style.removeProperty("pointer-events");
                    }
                    return this.currentPlayer = 1;
                }

            }
            if (this.currentPlayer === 1) return this.currentPlayer = 2;
            if (this.currentPlayer === 2) return this.currentPlayer = 1;
        },
        checkWin: function (board, player) {
            var stat = board.map(function (x, i) {
                if (x === player) return i;
            }, this);
            for (let index = 0; index < this.winCombo.length; index++) {
                if (stat.indexOf(this.winCombo[index][0]) !== -1 && stat.indexOf(this.winCombo[index][1]) !== -1 && stat.indexOf(this.winCombo[index][2]) !== -1) {
                    return true;
                };
                
            }
            return false;
        }
    }
};
</script>
<style scoped>
.columns.is-mobile>.column.is-6{
    width: 30%;
}
</style>