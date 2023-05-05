$(document).ready(function ready() {
    


    // handle add book submit using javascript
    /*
    const form = document.getElementById("add_form");
    form.addEventListener('submit',addSubmit);
    function addSubmit(e){
        e.preventDefault();
        console.log("submit added book");
        const id = document.getElementById("add_id").value,
            name = document.getElementById("add_name").value,
            price = document.getElementById("add_price").value,
            author = document.getElementById("add_author").value;
        console.log(id,name,price,author);
        // find all id numbers in the table
        const id_list = document.querySelectorAll("#book_table tbody tr th");
        // check if the id already exists
        id_list.forEach(function(item){
            if (item.textContent == id){
                alert("The book with id "+id+" already exists!");
                throw new Error("The book with id "+id+" already exists!");
            }
        });
        // add new row to table using innerHTML and ${}
        const table_body = document.getElementById("table_body");
        table_body.innerHTML +=
            `<tr>
                <th scope='row'>${id}</th>
                <td>${name}</td>
                <td>${price}</td>
                <td>${author}</td>
                <td><a href='' class='me-2 edit_bt'>Edit</a><a href='' class="delete_bt">Delete</a></td>
            </tr>`;
        // $("#table_body").append(
        //     "<tr><th scope='row'>"+id+"</th><td>"+name+"</td><td>"+price+"</td><td>"
        //         +author+"</td><td><a href='' class='me-2'>Edit</a><a href=''>Delete</a></td></tr>"
        // );
    }
    */
    
    // handle add book submit using jquery
    // /*
    $("#add_form").on("submit",function(e){
        e.preventDefault();
        console.log("submit added book");
        var id = $("#add_id").val();
        var name = $("#add_name").val();
        var price = $("#add_price").val();
        var author = $("#add_author").val();
        console.log(id,name,price,author);
        // find all id numbers in the table
        var $id = $("#book_table tbody tr th");
        // check if the id already exists
        $id.each(function(){
            if ($(this).text() == id){
                alert("The book with id "+id+" already exists!");
                throw new Error("The book with id "+id+" already exists!");
            }});
        // add new row to table using $()
        $("#table_body").append(
            `<tr>
                <th scope='row'>${id}</th>
                <td>${name}</td>
                <td>${price}</td>
                <td>${author}</td>
                <td><a href='' class='me-2 edit_bt'>Edit</a><a href='' class="delete_bt">Delete</a></td>
            </tr>`);
          
    });
    // */

    // handle edit book submit using jquery
    // /*
    $("#edit_form").on("submit",function(e){
        e.preventDefault();
        console.log("submit edited book");
        var id = $("#edit_id").text();
        var name = $("#edit_name").val();
        var price = $("#edit_price").val();
        var author = $("#edit_author").val();
        console.log(id,name,price,author);

        // find the corresponding row in table
        // Solution 1
        // /* 
        $('#book_table tbody tr').each(function() {
            const $row = $(this);
            const rowId = $row.find('th').eq(0).text();
            if (rowId == id) {
                $row.find('td').eq(0).text(name);
                $row.find('td').eq(1).text(price);
                $row.find('td').eq(2).text(author);
                console.log('Row updated:', $row);
                return false; // Stop looping once you find the target row
            }
          });
        // */
        /* 
        // Solution 2
        var $rows = $("#book_table").find("tbody tr");
        for (let i = 0; i < $rows.length; i++) {
            const $row = $rows[i];
            const $id = $($row).find('th').text();
            if ($id == id) {
                $($row).replaceWith("<tr><th scope='row'>"+id+"</th><td>"+name+"</td><td>"+price+"</td><td>"
                +author+"</td><td><a href='' class='me-2 edit_bt'>Edit</a><a class='delete_bt' href=''>Delete</a></td></tr>")
            }
        }
        */
    });
    // */

    // Attach click event listener to all edit buttons
    // $('#book_table').on('click', 'a:contains("Edit")', function(e) {
    // $('tr td a:nth-child(1)').on('click', function(e) {
    $('.edit_bt').on('click', function(e) {
        console.log("edit button clicked")
        e.preventDefault();
        const $row = $(this).closest('tr');
        const id = $row.find('th').eq(0).text();
        const name = $row.find('td').eq(0).text();
        const price = $row.find('td').eq(1).text();
        const author = $row.find('td').eq(2).text();
        console.log(id, name, price, author);
        // fill data to edit form
        $("#edit_id").text(id);
        $("#edit_name").val(name);
        $("#edit_price").val(price);
        $("#edit_author").val(author);
    });

    // Attach click event listener to all delete buttons
    $('.delete_bt').on('click', function(e) {
        console.log("delete button clicked");
        e.preventDefault();
        const $row = $(this).closest('tr');
        $row.remove();
    });

    // handle filter select using jquery
    $('select').on('change', function(e) {
        console.log("filter changed");
        e.preventDefault();
        const filter = $(this).val();
        console.log(filter);
        // update placeholder of filter input
        $('#filter_input').attr('placeholder', 'Enter ' + filter);
        // filter table
        filterTable();
    });
    /* handle filter select using javascript
    const selectElement = document.querySelector('#filter_select');
    const inputElement = document.querySelector('#filter_input');
    selectElement.addEventListener('change', (event) => {
        console.log("filter changed");
        event.preventDefault();
        const filter = event.target.value;
        console.log(filter);
        // update placeholder of filter input
        inputElement.setAttribute('placeholder', 'Enter ' + filter);
        // filter table
        // ...
    });
    */

    // handle filter input using jquery
    // every time the input changes, filter the table
    $('#filter_input').on('input', function(e) {
        console.log("filter input changed");
        e.preventDefault();
        filterTable();
    });

    // filter table function
    function filterTable() {
        const filter_name = $('#filter_select').val(); // filter name
        const filter_value = $('#filter_input').val().toLowerCase(); // filter value
        console.log('Filtering',filter_name, 'with', filter_value);
        // filter table
        
        $('#book_table tbody tr').each(function() {
            const $row = $(this);
            if (filter_name == "Name") {               
                var rowValue = $row.find('td').eq(0).text().toLowerCase();
                rowValue.startsWith(filter_value) ? $row.show() : $row.hide();
            }
            else if (filter_name == "Author") {
                var rowValue = $row.find('td').eq(2).text().toLowerCase();
                rowValue.startsWith(filter_value) ? $row.show() : $row.hide();
            }
            else if(filter_name == "Min Price"){
                var rowValue = $row.find('td').eq(1).text();
                // console.log(rowValue);
                Number(rowValue) >= filter_value ? $row.show() : $row.hide();
            }
            else if(filter_name == "Max Price"){
                var rowValue = $row.find('td').eq(1).text();
                // console.log(rowValue);
                Number(rowValue) <= filter_value ? $row.show() : $row.hide();
            }         
        });
    }

    // handle sort of id and price
    $('a.sort-by').on('click', function(e) {  
        console.log("sort button clicked");
        e.preventDefault();
        const sort_by = $(this).text();
        console.log(sort_by);
        // sort table
        $('#book_table tbody tr').sort(function(a, b) {
            if (sort_by == "ID") {
                var idA = $(a).find('th').eq(0).text();
                var idB = $(b).find('th').eq(0).text();
                return idA - idB;
            }
            else if (sort_by == "Price") {
                var priceA = $(a).find('td').eq(1).text();
                var priceB = $(b).find('td').eq(1).text();
                return priceA - priceB;
            }
            else if (sort_by == "Name"){
                var authorA = $(a).find('td').eq(0).text();
                var authorB = $(b).find('td').eq(0).text();
                return authorA.localeCompare(authorB);
            }
        }
        ).appendTo('#book_table tbody');

    })

});
