<template>
    <main class="min-height-100">
        <section class="section-faqs">
        <div class="container">
            <div class="avatar-title"><h3 class="mb-4">FAQS</h3></div>
            <div class="accordion" id="accordionExample">
                <div class="card">
                    <div class="card-header" id="headingOne">
                        <h2 class="mb-0">
                            <button class="accordion-button" type="button" data-toggle="collapse"
                                data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Will the games stay free?
                            </button>
                        </h2>
                    </div>

                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne"
                        data-parent="#accordionExample">
                        <div class="card-body">
                            Yes! We believe that your financial situation shouldn’t impact your enjoyment of playing io games, and such will always keep the games free. Thanks to the Ads, we are able to cover the monthly server costs!
                             Supporting us on by making a donation however allows us to increase development speed and bring you new great features!
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header" id="headingTwo">
                        <h2 class="mb-0">
                            <button class="accordion-button" type="button" data-toggle="collapse"
                                data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                How can I change my nickname?
                            </button>
                        </h2>
                    </div>
                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                        <div class="card-body">
                            Go to your profile’s settings an click on “My profile”.
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header" id="headingThree">
                        <h2 class="mb-0">
                            <button class="accordion-button" type="button" data-toggle="collapse"
                                data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                I have spotted a cheater, what can I do?
                            </button>
                        </h2>
                    </div>
                    <div id="collapseThree" class="collapse" aria-labelledby="headingThree"
                        data-parent="#accordionExample">
                        <div class="card-body">
                            And lastly, the placeholder content for the third and final accordion panel. This panel is
                            hidden by default.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </main>
</template>

<script>
    export default {
        
    }
</script>

<style  scoped>
    .section-faqs {
            padding: 100px 0px 70px;
        }

        .accordion-button {
            font-size: 18px;
            font-weight: 700;
            border: none;
            background-color: transparent;
        }

        .accordion-item {
            border: 0px;
            border-bottom: 1px solid #999;
        }

        .section-faqs .card {
            border: none;
        }

        .section-faqs .card-header {
            background: transparent;
        }
</style>