(() => {
    document.addEventListener('DOMContentLoaded', () => {
        fontesModal()
        requisiçãoApi()
    })


    // funcoes
    const fontesModal = () => {
        const $fontesBotao = document.querySelector('.js-fontes-botao')
        const $fontesBotaoSeta = document.querySelector('.js-fontes-seta')
        const $fontesModal = document.querySelector('.js-fontes-modal')
        const $fontesOpcoes = document.querySelectorAll('.js-fontes-opcao')
        const $body = document.querySelector('body')

        $fontesBotao.addEventListener('click', () => {
            fontesModalMostrar()
            fontesModalEsconder()
        })

        fontesTrocar()


        // funcoes internas
        function fontesModalMostrar() {
            mostrar($fontesModal)
            $fontesBotaoSeta.classList.toggle('rotate-180')
        }

        function fontesModalEsconder() {
            $body.addEventListener('click', (evento) => {

                if (evento.target.closest('.js-fontes-botao')) {
                    return
                }

                esconder($fontesModal)
                $fontesBotaoSeta.classList.remove('rotate-180')
            })
        }

        function fontesTrocar() {
            const $fonteEscolhida = document.querySelector('.js-fonte-escolhida')

            let fonteEscolhidaTipo = $body.getAttribute('data-fonte-tipo-inicial')
            let fonteAtualTipo = $body.getAttribute('data-fonte-tipo')
            let fonteAtual = $body.getAttribute('data-fonte-familia')

            $fonteEscolhida.innerHTML = fonteEscolhidaTipo
            $body.classList.add(`font-['${fonteAtual}']`)

            $fontesOpcoes.forEach($fonteOpcao => {
                $fonteOpcao.addEventListener('click', () => {
                    let fonteEscolhida = $fonteOpcao.getAttribute('data-fonte-familia')

                    fonteEscolhidaTipo = $fonteOpcao.getAttribute('data-fonte-tipo')
                    fonteAtual = $body.getAttribute('data-fonte-familia')
                    fonteAtualTipo = $body.getAttribute('data-fonte-tipo')

                    $body.setAttribute('data-fonte-familia', fonteEscolhida)
                    $fonteEscolhida.innerHTML = fonteEscolhidaTipo

                    $body.classList.remove(`font-['${fonteAtual}']`)
                    $body.classList.add(`font-['${fonteEscolhida}']`)
                })
            })
        }
    }

    const requisiçãoApi = () => {
        const $pesquisarBotao = document.querySelector('.js-pesquisar-botao')
        const $pesquisarCampo = document.querySelector('.js-pesquisar-campo')
        const $containerTextosDinamicos = document.querySelector('.js-container-markup')

        $pesquisarBotao.addEventListener('click', () => {
            const palavraPesquisada = $pesquisarCampo.value
            const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${palavraPesquisada}`

            fetch(url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                const markup = 
                `
                    <div>
                        <div class="flex justify-between items-center">
                            <h2 class="text-3xl font-bold js-titulo-dinamico">${data[0].word}</h2>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7 cursor-pointer hover:scale-110 transition-transform active:scale-95">
                                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                                <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
                            </svg>
                        </div>
                        <div class="text-slate-400 text-opacity-70">
                            <span>${data[0].meanings[0].partOfSpeech}</span>
                            <span>${data[0].phonetic || ""}</span>
                        </div>
                    </div>
                    <div class="">
                        <span class="text-slate-400 text-lg relative flex flex-col after:absolute after:left-20 after:right-0 after:translate-y-1/2 after:top-1/2 after:h-px after:bg-slate-300">Meaning</span>
                        <span>${data[0].meanings[0].definitions[0].definition}</span>
                    </div>
                    <div class="pl-4 italic relative before:absolute before:h-full before:w-1 before:left-0 before:bg-slate-600">
                        <span>${data[0].meanings[0].definitions[0].example || ""}</span>
                    </div>
                `

                // aplica transicao na entrada dos textos
                textosTransicao()


                // funcoes internas
                function textosTransicao() {
                    $containerTextosDinamicos.classList.remove('opacity-100')
                    $containerTextosDinamicos.classList.add('opacity-0')

                    setTimeout(() => {
                        $containerTextosDinamicos.innerHTML = ''

                        $containerTextosDinamicos.classList.add('opacity-100')
                        $containerTextosDinamicos.classList.remove('opacity-0')

                        $containerTextosDinamicos.insertAdjacentHTML('beforeend', markup)
                    }, 300)
                }
            })
        })
    }

    function esconder($alvo) {
        $alvo.classList.remove('flex')
        $alvo.classList.add('hidden')
    }

    function mostrar($alvo) {
        $alvo.classList.toggle('hidden')
        $alvo.classList.toggle('flex')
    }
})()