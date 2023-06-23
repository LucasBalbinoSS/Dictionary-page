(() => {
    document.addEventListener('DOMContentLoaded', () => {
        menu()
        requisicaoApi()
    })

    const $body = document.querySelector('body')
    const $container = document.querySelector('.js-card-container')
    const $pesquisarCampo = document.querySelector('.js-pesquisar-campo')
    const $label = document.querySelector('.js-label')

    const menu = () => {
        const $menuLateralBtn = document.querySelector('.js-menu-lateral-btn')
        const $menuLateral = document.querySelector('.js-menu-lateral')
        const $menuLateralInternoUm = document.querySelector('.js-menu-lateral-interno-1')
        const $btnFontes = document.querySelector('.js-fontes-btn')
        const $vetorFontes = document.querySelector('.js-fontes-vetor')
        const $fontesOpcoes = document.querySelectorAll('.js-fontes-opcao')

        $menuLateralBtn.addEventListener('click', () => {
            abreFecha($menuLateral)
        })

        $btnFontes.addEventListener('click', () => {
            menuFontesAbreFecha()
        })

        fontesTrocar()
        menuFontesEsconder()


        // funcoes
        function menuFontesAbreFecha() {
            abreFecha($menuLateralInternoUm)
            $vetorFontes.classList.toggle('rotate-180')
        }

        function menuFontesEsconder() {
            $body.addEventListener('click', (evento) => {

                if (evento.target.closest('.js-menu-lateral')
                ||  evento.target == $menuLateralBtn) {
                    return
                }

                $menuLateral.classList.add('hidden')
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

    const requisicaoApi = () => {
        const $pesquisarBotao = document.querySelector('.js-pesquisar-botao')

        $pesquisarBotao.addEventListener('click', () => {
            palavraValidar()
        })

        $pesquisarCampo.addEventListener('keydown', () => {
            teclaEnter(event)

            function teclaEnter(event) {
                if (event.keyCode === 13) {
                    palavraValidar()
                }
              }
        })

        function dados(resultado, palavra) {
            if (resultado.title) {
                $label.innerHTML = `We couldn't find definitions for "<span class="text-slate-800">${palavra}</span>"...`
                $container.classList.remove('ativo')
            }
            else {
                $label.innerHTML = 'Type any word here to get the meaning...'
                $container.classList.add('ativo')

                document.querySelector('.js-palavra-pesquisada').innerHTML = resultado[0].word
                document.querySelector('.js-palavra-tipo').innerHTML = `${resultado[0].meanings[0].partOfSpeech}`
                document.querySelector('.js-palavra-fonetica').innerHTML = `${resultado[0].phonetic || ""}`
                document.querySelector('.js-palavra-significado').innerHTML = `${resultado[0].meanings[0].definitions[0].definition}`
                document.querySelector('.js-palavra-exemplo').innerHTML = `"${resultado[0].meanings[0].definitions[0].example || "<span class=\"text-lg\">...</span>"}"`
                document.querySelector('.js-palavra-sinonimo').innerHTML = `${resultado[0].meanings[0].synonyms[0] || "<span class=\"text-lg\">...</span>"}`

                const $sonar = document.querySelector('audio')
                const $sonarBotao = document.querySelector('.js-botao-sonar')

                $sonar.setAttribute('src', resultado[0].phonetics[0].audio)

                $sonar.getAttribute('src') == '' ?
                $sonarBotao.classList.add('hidden') :
                $sonarBotao.classList.remove('hidden')


                $sonarBotao.addEventListener('click', () => {
                    $sonar.play()
                })
            }
        }

        function requisicao(palavra) {
            $label.innerHTML = `Searching the meaning of "<span class="text-slate-800">${palavra}</span>"`
            const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${palavra}`

            fetch(url)
            .then(response => {
                return response.json()
            })
            .then(resultado => {
                dados(resultado, palavra)
            })
        }

        function palavraValidar() {
            const palavraPesquisada = $pesquisarCampo.value.toLowerCase().trim()

            if (palavraPesquisada == "") {
                return
            }

            requisicao(palavraPesquisada)
        }
    }

    function abreFecha($alvo) {
        $alvo.classList.toggle('hidden')
    }
})()