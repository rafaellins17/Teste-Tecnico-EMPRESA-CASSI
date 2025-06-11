// Animação de seta nos dropdowns
function toggleDropdown(selector) {
  document.querySelectorAll(selector).forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const submenu = link.nextElementSibling
      submenu.classList.toggle('show')
    })
  })
}

// Menu hamburguer
function toggleMenu(hamburgerId, menuId) {
  const hamburger = document.getElementById(hamburgerId)
  const navMenu = document.getElementById(menuId)
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active')
  })
}

// Comportamento dos botões da NIP
function configurarEtapasNip({
  btnNaoId,
  btnSimId,
  titleContainerId,
  buttonContainerId,
  modalFormId,
}) {
  const btnNao = document.getElementById(btnNaoId)
  const btnSim = document.getElementById(btnSimId)
  const nipTitle = document.getElementById(titleContainerId)
  const nipButtons = document.getElementById(buttonContainerId)
  const modalForm = document.getElementById(modalFormId)

  let respostaInterlocutor = ''

  btnNao.addEventListener('click', () => {
    nipTitle.innerHTML = '<strong>Reconhece o interlocutor?</strong><br><br>'
    nipButtons.innerHTML = `
      <button class="btn-outline" id="btn-nao-interlocutor">Não</button>
      <button class="btn-primary" id="btn-sim-interlocutor">Sim</button>
    `

    const btnNaoInterlocutor = document.getElementById('btn-nao-interlocutor')
    const btnSimInterlocutor = document.getElementById('btn-sim-interlocutor')

    btnNaoInterlocutor.addEventListener('click', () => {
      respostaInterlocutor = 'nao'
      modalForm.style.display = 'flex'
    })

    btnSimInterlocutor.addEventListener('click', () => {
      respostaInterlocutor = 'sim'
      modalForm.style.display = 'flex'
    })
  })

  btnSim.addEventListener('click', () => {
    nipTitle.innerHTML = ''
    nipButtons.innerHTML = `
      <div class="alert-box-yes">
        <i class="far fa-check-circle" style="color: #29BB11;"></i>
        <span>Abertura da NIP <strong>RECONHECIDA</strong> pelo usuário.</span>
      </div>
      <br>
      <div class="success-box">
        <i class="fas fa-check-circle"></i>
        <strong>Obrigado pela resposta!</strong>
      </div>
    `
  })

  document.querySelector('#modal-form form').addEventListener('submit', (e) => {
    e.preventDefault()
    modalForm.style.display = 'none'

    let mensagem = ''

    if (respostaInterlocutor === 'nao') {
      mensagem = `
      <div class="alert-box">
        <i class="fas fa-exclamation-circle"></i>
        <span>
           Interlocutor <strong> NÃO RECONHECIDO</strong> e abertura da NIP <strong>NÃO RECONHECIDA</strong> pelo usuário.
        </span>
      </div>
    `
    } else if (respostaInterlocutor === 'sim') {
      mensagem = `
      <div class="alert-box">
        <i class="fas fa-exclamation-circle"></i>
        <span>
         Interlocutor <strong> RECONHECIDO</strong> e abertura da NIP <strong>NÃO RECONHECIDA</strong> pelo usuário.
        </span>
      </div>
    `
    }

    nipTitle.innerHTML = ''
    nipButtons.innerHTML = `
      ${mensagem}
      <br>
      <div class="success-box">
        <i class="fas fa-check-circle"></i>
        <strong>Obrigado pela resposta!</strong>
      </div>
    `
  })

  const btnVoltar = document.getElementById('btn-voltar')
  btnVoltar.addEventListener('click', () => {
    modalForm.style.display = 'none'
  })
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  toggleDropdown('.dropdown > a')
  toggleMenu('hamburger-btn', 'nav-menu')
  configurarEtapasNip({
    btnNaoId: 'btn-nao-nip',
    btnSimId: 'btn-sim-nip',
    titleContainerId: 'nip-title',
    buttonContainerId: 'nip-buttons',
    modalFormId: 'modal-form',
  })
})
