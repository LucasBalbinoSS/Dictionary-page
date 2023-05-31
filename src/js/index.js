(() => {
    document.addEventListener('DOMContentLoaded', () => {
        fontesModal()
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

            let fonteEscolhidaTipo = $body.getAttribute('data-fonte-tipo')
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

    function esconder($alvo) {
        $alvo.classList.remove('flex')
        $alvo.classList.add('hidden')
    }

    function mostrar($alvo) {
        $alvo.classList.toggle('hidden')
        $alvo.classList.toggle('flex')
    }
})()