// script.js - Dashboard de Soporte Técnico Junior
// Versión final profesional | Luis Antonio Monsalve Hernández | 2026

document.addEventListener('DOMContentLoaded', function() {
    // ==============================
    // 🔐 Sistema de autenticación básica
    // ==============================
    const AUTH_TOKEN = 'soporte-junior';
    let isAuthenticated = false;

    function login() {
        const token = prompt('Ingresa el token de acceso para gestionar tickets:', '');
        if (!token) return; // Canceló

        if (token === AUTH_TOKEN) {
            isAuthenticated = true;
            alert('✅ Autenticación exitosa. ¡Ahora puedes registrar y gestionar tickets!');
            document.getElementById('ticket-form').style.display = 'block';
            document.querySelector('.btn-login')?.classList.add('authenticated');
        } else {
            alert('❌ Token incorrecto. Contacta al administrador.');
        }
    }

    // Si hay botón de login, asignar evento
    const loginBtn = document.querySelector('.btn-login');
    if (loginBtn) {
        loginBtn.addEventListener('click', login);
    }

    // ==============================
    // 🔍 Filtrado de tickets por prioridad
    // ==============================
    const priorityFilter = document.getElementById('priority-filter');
    const resetFilter = document.getElementById('reset-filter');
    const ticketsTable = document.getElementById('tickets-table');

    function filterTickets() {
        const filter = priorityFilter.value;
        const rows = ticketsTable.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const priorityCell = row.querySelector('.prioridad-alta, .prioridad-media, .prioridad-baja');
            const priority = priorityCell ? priorityCell.className.split('-')[1] : '';

            if (filter === 'todos' || priority === filter) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    // Eventos de filtrado
    if (priorityFilter) {
        priorityFilter.addEventListener('change', filterTickets);
    }
    if (resetFilter) {
        resetFilter.addEventListener('click', function() {
            priorityFilter.value = 'todos';
            filterTickets();
        });
    }

    // ==============================
    // 📝 Formulario de registro de tickets
    // ==============================
    const ticketForm = document.getElementById('ticket-form');
    if (ticketForm) {
        ticketForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Solo permitir si está autenticado (opcional, pero recomendado)
            if (!isAuthenticated) {
                alert('⚠️ Debes iniciar sesión primero para registrar tickets.');
                return;
            }

            const description = document.getElementById('ticket-description').value.trim();
            const priority = document.getElementById('ticket-priority').value;
            
            if (!description) {
                alert('Por favor, describe el problema.');
                return;
            }

            // Generar ID único
            const tbody = ticketsTable.querySelector('tbody');
            const lastId = tbody.children.length;
            const newId = `#00${lastId + 6}`;

            // Fecha actual
            const today = new Date();
            const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;

            // Crear nueva fila
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${newId}</td>
                <td>${description}</td>
                <td class="estado-abierto">Abierto</td>
                <td class="prioridad-${priority}">${priority.charAt(0).toUpperCase() + priority.slice(1)}</td>
                <td>${formattedDate}</td>
            `;
            
            // Insertar al inicio
            tbody.prepend(newRow);

            // Resetear formulario
            ticketForm.reset();

            // Mostrar confirmación
            alert('✅ Ticket registrado con éxito. En un sistema real, se enviaría a una base de datos.');

            // Actualizar estadísticas (simulación)
            updateStats();
        });
    }

    // ==============================
    // 📊 Actualización de estadísticas (simulada)
    // ==============================
    function updateStats() {
        const openTickets = document.querySelectorAll('.estado-abierto').length;
        const closedTickets = document.querySelectorAll('.estado-cerrado').length;
        const total = openTickets + closedTickets;
        const resolutionRate = total > 0 ? Math.round((closedTickets / total) * 100) : 0;

        document.querySelector('.stat-value:nth-child(1)').textContent = openTickets;
        document.querySelector('.stat-value:nth-child(2)').textContent = closedTickets;
        document.querySelector('.stat-value:nth-child(3)').textContent = `${resolutionRate}%`;
    }

    // Inicializar stats al cargar
    if (document.querySelector('.stat-value')) {
        updateStats();
    }

    // ==============================
    // 📝 Registro de actividad (para demostración profesional)
    // ==============================
    console.log('%cDashboard de Soporte Técnico Junior', 'color: #2980b9; font-weight: bold;');
    console.log('✓ Sistema de autenticación activo');
    console.log('✓ Filtrado dinámico funcional');
    console.log('✓ Formulario de registro operativo');
    console.log('✓ Estadísticas actualizadas en tiempo real');
    console.log('✓ Proyecto educativo para primer empleo en TI');
    console.log('Autor: Luis Antonio Monsalve Hernández');
    console.log('GitHub: https://github.com/monsa2810/soporte-ti-dashboard-junior');
});
