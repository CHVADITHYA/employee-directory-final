let employees = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    department: 'Engineering',
    role: 'Developer',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    department: 'HR',
    role: 'Manager',
  },
];

function renderEmployees() {
  const limit = parseInt(document.getElementById('showCount').value || '10');
  const list = document.getElementById('employeeList');
  list.innerHTML = '';

  const search = document.getElementById('searchInput').value.toLowerCase();
  const department = document.getElementById('filterDepartment').value;
  const role = document.getElementById('filterRole').value;
  const sortBy = document.getElementById('sortBy').value;

  let filtered = employees.filter(e => {
    return (
      (!department || e.department === department) &&
      (!role || e.role === role) &&
      (e.firstName.toLowerCase().includes(search) || e.email.toLowerCase().includes(search))
    );
  });

  if (sortBy) {
    filtered.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  }

  filtered.slice(0, limit).forEach(emp => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <p><strong>ID:</strong> ${emp.id}</p>
      <p><strong>Name:</strong> ${emp.firstName} ${emp.lastName}</p>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
    list.appendChild(card);
  });
  console.log(limit)
}


function editEmployee(id) {
  const emp = employees.find(e => e.id === id);
  document.getElementById('employeeId').value = emp.id;
  document.getElementById('firstName').value = emp.firstName;
  document.getElementById('lastName').value = emp.lastName;
  document.getElementById('email').value = emp.email;
  document.getElementById('department').value = emp.department;
  document.getElementById('role').value = emp.role;
  document.getElementById('popupForm').style.display = 'flex';
}

function deleteEmployee(id) {
  if (confirm('Are you sure you want to delete this employee?')) {
    employees = employees.filter(e => e.id !== id);
    renderEmployees();
  }
}

document.getElementById('employeeForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const id = parseInt(document.getElementById('employeeId').value);
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const department = document.getElementById('department').value;
  const role = document.getElementById('role').value;

  if (id) {
    const index = employees.findIndex(e => e.id === id);
    employees[index] = { id, firstName, lastName, email, department, role };
  } else {
    const newId = employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    employees.push({ id: newId, firstName, lastName, email, department, role });
  }
  document.getElementById('employeeForm').reset();
  document.getElementById('popupForm').style.display = 'none';
  renderEmployees();
});

document.getElementById('searchInput').addEventListener('input', renderEmployees);
document.getElementById('filterDepartment').addEventListener('change', renderEmployees);
document.getElementById('filterRole').addEventListener('change', renderEmployees);
document.getElementById('sortBy').addEventListener('change', renderEmployees);
document.getElementById('showCount').addEventListener('change', renderEmployees);

window.onload = renderEmployees();

document.getElementById('toggleFilter').addEventListener('click', () => {
  const panel = document.getElementById('filterPanel');
  panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
});

document.getElementById('addEmployeeBtn').addEventListener('click', () => {
  document.getElementById('popupForm').style.display = 'flex';
});
document.getElementById('closePopup').addEventListener('click', () => {
  document.getElementById('popupForm').style.display = 'none';
});
window.addEventListener('click', function (e) {
  const modal = document.getElementById('popupForm');
  if (e.target === modal) modal.style.display = 'none';
});

document.getElementById('cancelPopup').addEventListener('click', () => {
  document.getElementById('popupForm').style.display = 'none';
});



