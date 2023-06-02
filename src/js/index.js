(() => {
    document.addEventListener('DOMContentLoaded', () => {
        modalFontes()
        modalIdiomas()
        requisicoesApi()
    })

    const $body = document.querySelector('body')
    const $pesquisarCampo = document.querySelector('.js-pesquisar-campo')
    const $containerTextosDinamicos = document.querySelector('.js-container-markup')

    const modalFontes = () => {
        const $fontesBotao = document.querySelector('.js-fontes-botao')
        const $fontesBotaoSeta = document.querySelector('.js-fontes-seta')
        const $modalFontes = document.querySelector('.js-fontes-modal')
        const $fontesOpcoes = document.querySelectorAll('.js-fontes-opcao')

        $fontesBotao.addEventListener('click', () => {
            modalFontesMostrar()
            modalFontesEsconder()
        })

        fontesTrocar()
        idiomaTrocar()


        // funcoes internas
        function modalFontesMostrar() {
            mostrar($modalFontes)
            $fontesBotaoSeta.classList.toggle('rotate-180')
        }

        function modalFontesEsconder() {
            $body.addEventListener('click', (evento) => {

                if (evento.target.closest('.js-fontes-botao')) {
                    return
                }

                esconder($modalFontes)
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

        function idiomaTrocar() {
            const $idiomasOpcao = document.querySelectorAll('.js-idiomas-opcao')

            $idiomasOpcao.forEach($idiomaOpcao => {
                $idiomaOpcao.addEventListener('click', () => {
                    const idiomaEscolhido = $idiomaOpcao.getAttribute('data-idioma')

                    $body.setAttribute('data-idioma', idiomaEscolhido)
                    elementosAlterar()
                })
            })
        }

        function elementosAlterar() {
            const $bandeiraBr = document.querySelector('.js-bandeira-br')
            const $dicionarioTituloBr = document.querySelector('.js-dicionario-titulo-br')
            const $bandeiraUs = document.querySelector('.js-bandeira-us')
            const $dicionarioTituloUs = document.querySelector('.js-dicionario-titulo-us')
            const $labelUs = document.querySelector('.js-label-us')
            const $labelBr = document.querySelector('.js-label-br')

            if ($body.getAttribute('data-idioma') == 'br') {
                $bandeiraUs.classList.add('hidden')
                $bandeiraBr.classList.remove('hidden')

                $dicionarioTituloUs.classList.add('hidden')
                $dicionarioTituloBr.classList.remove('hidden')

                $labelUs.classList.add('hidden')
                $labelBr.classList.remove('hidden')

                $pesquisarCampo.placeholder = 'ex: maçã'
                $pesquisarCampo.value = ''

                textosAnimacaoSumir($containerTextosDinamicos)

                setTimeout(() => {
                    $containerTextosDinamicos.innerHTML = ''
                }, 300);
            } else {
                $bandeiraUs.classList.remove('hidden')
                $bandeiraBr.classList.add('hidden')

                $dicionarioTituloUs.classList.remove('hidden')
                $dicionarioTituloBr.classList.add('hidden')

                $labelUs.classList.remove('hidden')
                $labelBr.classList.add('hidden')

                $pesquisarCampo.placeholder = 'eg: apple'
                $pesquisarCampo.value = ''

                textosAnimacaoSumir($containerTextosDinamicos)

                setTimeout(() => {
                    $containerTextosDinamicos.innerHTML = ''
                }, 300);
            }
        }
    }

    const modalIdiomas = () => {
        const $idiomasBotao = document.querySelector('.js-idiomas-botao')
        const $modalIdiomas = document.querySelector('.js-idiomas-modal')

        $idiomasBotao.addEventListener('click', () => {
            modalIdiomasMostrar()
            modalIdiomasEsconder()
        })

        function modalIdiomasMostrar() {
            mostrar($modalIdiomas)
        }

        function modalIdiomasEsconder() {
            addEventListener('click', (evento) => {

                if (evento.target.closest('.js-idiomas-botao')) {
                    return
                }

                esconder($modalIdiomas)
            })
        }
    }

    const requisicoesApi = () => {
        const $pesquisarBotao = document.querySelector('.js-pesquisar-botao')
        const $containerTextosDinamicos = document.querySelector('.js-container-markup')

        $pesquisarBotao.addEventListener('click', () => {
            idiomaValidar()
        })

        $pesquisarCampo.addEventListener('keydown', () => {
            teclaEnter(event)

            function teclaEnter(event) {
                if (event.keyCode === 13) {
                    idiomaValidar()
                }
              }
        })


        // funcoes
        function requisicaoUs() {
            const palavraPesquisada = $pesquisarCampo.value
            const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${palavraPesquisada}`

            fetch(url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                const conteudo =
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
                    <div class="flex flex-col gap-2">
                        <span class="text-slate-400 text-lg relative flex flex-col after:absolute after:left-20 after:right-0 after:translate-y-1/2 after:top-1/2 after:h-px after:bg-slate-300 after:bg-opacity-70">Meaning</span>
                        <span>${data[0].meanings[0].definitions[0].definition}</span>
                    </div>
                    <div class="flex flex-col gap-2">
                        <span class="text-slate-400 text-lg relative flex flex-col after:absolute after:left-20 after:right-0 after:translate-y-1/2 after:top-1/2 after:h-px after:bg-slate-300 after:bg-opacity-70">Example</span>
                        <div class="pl-4 italic relative before:absolute before:h-full before:w-1 before:left-0 before:bg-slate-600">
                            <span>${data[0].meanings[0].definitions[0].example || "<span class=\"text-slate-400 text-lg\">...</span>"}</span>
                        </div>
                    </div>
                `

                // aplica transicao na entrada dos textos
                textosTransicao()


                // funcoes internas
                function textosTransicao() {
                    textosAnimacaoSumir($containerTextosDinamicos)

                    setTimeout(() => {
                        $containerTextosDinamicos.innerHTML = ''
                        textosAnimacaoAparecer($containerTextosDinamicos)
                        $containerTextosDinamicos.insertAdjacentHTML('beforeend', conteudo)
                    }, 300)
                }
            }).catch(() => {
                const $markupErro =
                `
                <h2 class="text-3xl font-bold">no definitions found</h2>
                <div class="flex flex-col gap-2">
                    <p>Sorry pal, we couldn't find definitions for the word you were looking for...</p>
                    <p>You can try the search again at later time or <span class="font-bold">change the language in the menu above</span>.</p>
                </div>
                
                `

                textosAnimacaoSumir($containerTextosDinamicos)

                setTimeout(() => {
                    textosAnimacaoAparecer($containerTextosDinamicos)
                    $containerTextosDinamicos.innerHTML = $markupErro
                }, 300)
            })
        }

        function requisicaoBr() {
            const palavraPesquisada = $pesquisarCampo.value
            const url = `https://dicio-api-ten.vercel.app/v2/${palavraPesquisada}`

            fetch(url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                const conteudo =
                `
                    <div>
                        <div class="flex justify-between items-center">
                            <h2 class="text-3xl font-bold js-titulo-dinamico">${palavraPesquisada}</h2>
                        </div>
                        <div class="flex flex-col text-slate-400 text-opacity-70">
                            <span>${data[0].partOfSpeech}</span>
                            <span>${data[0].etymology}</span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-2">
                        <span class="text-slate-400 text-lg relative flex flex-col after:absolute after:left-28 after:right-0 after:translate-y-1/2 after:top-1/2 after:h-px after:bg-slate-300 after:bg-opacity-70">Significado</span>
                        <span>${data[0].meanings[0]}</span>
                    </div>
                `

                // aplica transicao na entrada dos textos
                textosTransicao()


                // funcoes internas
                function textosTransicao() {
                    textosAnimacaoSumir($containerTextosDinamicos)

                    setTimeout(() => {
                        $containerTextosDinamicos.innerHTML = ''
                        textosAnimacaoAparecer($containerTextosDinamicos)
                        $containerTextosDinamicos.insertAdjacentHTML('beforeend', conteudo)
                    }, 300)
                }
            }).catch(() => {
                const $markupErro =
                `
                <h2 class="text-3xl font-bold">nenhuma definição encontrada</h2>
                <div class="flex flex-col gap-2">
                    <p>Desculpe amigo, não encontramos definições para a palavra que você estava procurando...</p>
                    <p>Você pode tentar a pesquisa novamente mais tarde ou <span class="font-bold">alterar o idioma no menu acima</span>.</p>
                </div>
                
                `

                textosAnimacaoSumir($containerTextosDinamicos)

                setTimeout(() => {
                    textosAnimacaoAparecer($containerTextosDinamicos)
                    $containerTextosDinamicos.innerHTML = $markupErro
                }, 300)
            })
        }

        function idiomaValidar() {
            if ($body.getAttribute('data-idioma') == 'us') {
                requisicaoUs()
            }
            else {
                requisicaoBr()
            }
        }
    }

    function textosAnimacaoSumir($alvo) {
        $alvo.classList.remove('opacity-100')
        $alvo.classList.add('opacity-0')
    }

    function textosAnimacaoAparecer($alvo) {
        $alvo.classList.add('opacity-100')
        $alvo.classList.remove('opacity-0')
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