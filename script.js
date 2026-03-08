// script.js - Funcionalidad del dashboard de soporte técnico

document.addEventListener('DOMContentLoaded', function() {
    // Filtrado de tickets
    const priorityFilter = document.getElementById('priority-filter');
    const resetFilter = document.getElementById('reset-filter');
    const ticketsTable = document.getElementById('tickets-table');
    
    // Función para filtrar tickets
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
    
    // Event listeners para filtrado
    priorityFilter.addEventListener('change', filterTickets);
    
    resetFilter.addEventListener('click', function() {
        priorityFilter.value = 'todos';
        filterTickets();
    });
    
    // Formulario de registro de tickets
    const ticketForm = document.getElementById('ticket-form');
    
    ticketForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const description = document.getElementById('ticket-description').value;
        const priority = document.getElementById('ticket-priority').value;
        
        // Crear nuevo ticket
        const tbody = ticketsTable.querySelector('tbody');
        const newRow = document.createElement('tr');
        
        // Generar ID único
        const lastId = parseInt(tbody.querySelectorAll('tr').length);
        const newId = `#00${lastId + 6}`;
        
        // Fecha actual
        const today = new Date();
        const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
        
        // Crear celdas
        newRow.innerHTML = `
            <td>${newId}</td>
            <td>${description}</td>
            <td class="estado-abierto">Abierto</td>
            <td class="prioridad-${priority}">${priority.charAt(0).toUpperCase() + priority.slice(1)}</td>
            <td>${formattedDate}</td>
        `;
        
        // Agregar nuevo ticket
        tbody.prepend(newRow);
        
        // Resetear formulario
        ticketForm.reset();
        
        // Mostrar mensaje de éxito
        alert('¡Ticket registrado con éxito! En un proyecto real, esto se enviaría a un sistema backend.');
    });
    
    // Añadir comentarios para demostración
    console.log('Dashboard de Soporte Técnico Junior');
    console.log('Funcionalidad: Filtrado de tickets, registro de nuevos tickets');
    console.log('Proyecto creado para demostrar habilidades técnicas básicas');
    console.log('Autor: Luis Antonio Monsalve Hernández');
    
    // Simular carga inicial
    console.log('Cargando dashboard...');
    setTimeout(() => {
        console.log('Dashboard cargado correctamente');
    }, 500);
});
