


// // Api call
// fetch("https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD").then(
//     res=>{
//         res.json().then(
//             data=>{
//                 console.log(data.Data);
//                 if(data.Data.length>0)
//                 {
//                     var temp="";
//                     data.Data.forEach((u)=>{
//                        temp +="<tr>";
//                        temp +="<td>"+u.CoinInfo.FullName+"</td>";
//                        temp +="<td>"+u.CoinInfo.FullName+"</td> </tr>";
//                     })
//                     document.getElementById("data").innerHTML=temp;
//                     console.log(data.Data)
//                     console.log(temp)
//                 }
//             }
//         )
//     }
// )
let filterData;

// Basic example
function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("emp_body");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }



//   $('#table-wrapper').renderTable({
//   template: data.Data,
//   data: data.Data,
//   pagination: {
//     rowPageCount: 3 // maximum rows per one page
//   },
// });

var $pagination = $('#pagination'),
totalRecords = 0,
records = [],
records1=[],
displayRecords = [],
recPerPage = 10,
page = 1,
totalPages = 0;



 $.ajax({
      url: "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD",
      async: true,

      dataType: 'json',
      success: function (data) {
                  records = data.Data;
                  console.log(records);
                  totalRecords = records.length;
                  totalPages = Math.ceil(totalRecords / recPerPage);
                  apply_pagination();
                  
      
      }
});




function apply_pagination() {
    $pagination.twbsPagination({
          totalPages: totalPages,
          visiblePages: 6,
          onPageClick: function (event, page) {
                displayRecordsIndex = Math.max(page - 1, 0) * recPerPage;
                endRec = (displayRecordsIndex) + recPerPage;
               
                displayRecords = records.slice(displayRecordsIndex, endRec);
                generate_table();
          }
    });
}


// function generate_table() {
//     var tr;
//     $('#emp_body');
//     for (var i = 0; i < displayRecords.length; i++) {
//           tr = $('<tr/>');
//           tr.append("<td>" + displayRecords[i].CoinInfo.FullName + "</td>");
          
//           $('#emp_body').append(tr);
    
//     console.log(displayRecords)
// }
// }
const renderchange=(percent)=>{
    if(percent>0)
    {
      return (`<span style=color:green>${percent}% &uarr;</span>`);
    }
    else if(percent<0) 
    {
      return(`<span style=color:red>${percent}% &darr;</span>`)
    }
      }
      function fnum(x) {
        if(isNaN(x)) return x;
    
        if(x < 9999) {
            return x;
        }
    
        if(x < 1000000) {
            return Math.round(x/1000) + "K";
        }
        if( x < 10000000) {
            return (x/1000000).toFixed(2) + "M";
        }
    
        if(x < 1000000000) {
            return Math.round((x/1000000)) + "M";
        }
    
        if(x < 1000000000000) {
            return Math.round((x/1000000000)) + "B";
        }
    
        return "1T+";
    }
const generate_table=()=>{
    document.getElementById('emp_body').innerHTML=displayRecords.map(user=>{
        const CHANGEPCT24HOUR=(Math.round(user.RAW.USD.CHANGEPCT24HOUR*100)/100)
        const HIGHDAY=(Math.round(user.RAW.USD.HIGHDAY*100)/100)
        const LOWDAY=(Math.round(user.RAW.USD.LOWDAY*100)/100)
        const PRICE=(Math.round(user.RAW.USD.PRICE*100)/100)
        // const OPEN24HOUR=(Math.round(user.RAW.USD.OPEN24HOUR*100)/100)
return(
        `<tr>
        <td><img class="img-fluid curreny-logo" style=height:30px src=https://www.cryptocompare.com${user.CoinInfo.ImageUrl}>${user.CoinInfo.FullName}</td>
        <td>${user.CoinInfo.Internal+"/"+user.RAW.USD.TOSYMBOL}</td>
        <td>${fnum(user.RAW.USD.MKTCAP)}</td>
        <td>${HIGHDAY}</td>
        <td>${LOWDAY}</td>
        <td>${PRICE}</td>
        <td>${renderchange(CHANGEPCT24HOUR)}</</td>
        </tr>
        `
    )}).join('')
    }

// 
$.ajax({
    url: "https://api.crex24.com/CryptoExchangeService/BotPublic/ReturnTicker",
    async: true,

    dataType: 'json',
    success: function (data) {
                records1 = data.Tickers;
                console.log(records1);
            filterData = records1.filter(val => {
                return val.PairName.includes('GXT') 
                
                // || val.PairName.includes('BTC_ETH')
               
            })
           
            console.log(filterData)
            gen();  
    
    }
    
    // `<h4>${user1.PairName}</h4>`
    // `<p>${user1.Last}</p>`
    // `<p>${user1.PercentChange}</p>`

});
 function gen(){
document.getElementById('token').innerHTML=filterData.map(user1=>{
    return(
        
        `
    <div class="lo">
        <p class="s-p1">${user1.PairName}</p>
        <p class="s-p">${user1.Last}</p>
 <div>
        `

    )
}).join('')
}

// sorting


function CreateTableFromJSON() {
    var myBooks = [
        {
            "Book ID": "1",
            "Price": "125.60"
        },
        {
            "Book ID": "2",
            "Price": "56.00"
        },
        {
            "Book ID": "3",
            "Price": "210.40"
        }
    ]

    // EXTRACT VALUE FOR HTML HEADER. 
    // ('Book ID', 'Book Name', 'Category' and 'Price')
    var col = [];
    for (var i = 0; i < myBooks.length; i++) {
        for (var key in myBooks[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    var table = document.getElementById("employee");
    var tbody = document.getElementById("emp_body");
var tr = tbody.insertRow(0);   

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < myBooks.length; i++) {

        tr = tbody.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = myBooks[i][col[j]];
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}



$(document).ready(function(){

var sortOrder = 1; // flag to toggle the sorting order
function getVal(elm, colIndex){
var td = $(elm).children('td').eq(colIndex).text();
if(typeof td !== "undefined"){
    var v = td.toUpperCase();
    if($.isNumeric(v)){
        v = parseInt(v,10);
    }
    return v;
}
}

$(document).on('click', '.sortable', function(){
var self = $(this);
var colIndex = self.prevAll().length;
var o = (sortOrder == 1) ? 'th' : 'th'; // you can use for css to show sort direction
sortOrder *= -1; // toggle the sorting order

$('.sortable').children('th').children('th');
self.addClass(o);

var tbody = self.closest("table").find("tbody");
var tr = tbody.children("tr"); //.get();

tr.sort(function(a, b) {
    var A = getVal(a, colIndex);
    var B = getVal(b, colIndex);

    if(A < B) {
        return -1*sortOrder;
    }
    if(A > B) {
        return 1*sortOrder;
    }
    return 0;
});

$.each(tr, function(index, row) {
    //console.dir(row)
    tbody.append(row);
});

});

});


// 
/*$(document).ready(function(e) {
    var t = "socket.io",
        n = "8080",
        r = "localhost",
        i = "localhost/";
    var s = ("https:" == document.location.protocol ? "https://" : "http://") + i;
$.when(
    $.getScript( "/mypath/myscript1.js" ),
    $.getScript( "/mypath/myscript2.js" ),
    $.getScript( "/mypath/myscript3.js" ),
    $.Deferred(function( deferred ){
        $( deferred.resolve );
    })
).done(function(){

    //place your code here, the scripts are all loaded

});
    $.getScript("https://" + r + ":" + n + "/" + t + "/" + t + ".js", function() {
       
        $(".chat_message").animate({
            scrollTop: $(".chat_message").outerHeight() + 1e7
        }, 1e3);
        var e = $(".id").val();
        var t = $(".my_user").val();
        var i = io.connect("https://" + r + ":" + n);
        var s = "id=" + e;
        $.ajax({
            type: "POST",
            url: name + "chat/login_check.php",
            data: s,
            success: function(e) {
                if (e != "") {
                    i.emit("new_chat_js_user_enter", e)
                }
            }
        });
        $.validate({
            form: "#chat_form",
            onSuccess: function() {
                var e = $("#chat_form").serialize();
                $.ajax({
                    type: "POST",
                    url: name + "chat/login_user.php",
                    data: e,
                    success: function(e) {
                        var t = e.split("-");
                        $(".my_user").val(t[1]);
                        $(".logout").attr("name", e);
                        $(".chat_form")[0].reset();
                        $(".logout").show();
                        $(".chat_message").show();
                        $(".chat_text_area").show();
                        $(".chat_entry").hide();
                        i.emit("new_chat_js_user_enter", e)
                    }
                })
            }
        });
        i.on("admin_chat_status_update", function(t) {
            var n = t.user_id;
            var r = t.status;
            if (n == e) {
                if (r == "1") {
                    $(".no_provider").text("Operator Joined the Chat.")
                } else {
                    $(".no_provider").text("Sorry, no operators are currently available")
                }
            }
        });
        i.on("admin_message_emit_update", function(e) {
            var t = e.from_id;
            var n = e.to_id;
            var r = "from_id=" + t + "&to_id=" + n;
            $.ajax({
                type: "POST",
                url: name + "chat/get_last_message.php",
                data: r,
                success: function(e) {
                    $(".chat_message").append(e);
                    $(".chat_message div:last-child").hide().fadeIn("slow");
                    $(".chat_message").animate({
                        scrollTop: $(".chat_message").outerHeight() + 1e8
                    }, 1e3)
                }
            })
        });
        $(".messag_send").keypress(function(e) {
            if (e.which == 13) {
                var t = $(".id").val();
                var n = $(".my_user").val();
                var r = $(this).val();
                var s = $(this).val().replace(/(^[\s]+|[\s]+$)/g, "");
                var o = "message=" + r + "&id=" + t;
                if (s != "") {
                    $(".messag_send").val("");
                    $.ajax({
                        type: "POST",
                        url: name + "chat/message_send.php",
                        data: o,
                        success: function(e) {
                            i.emit("user_message_emit", {
                                from_id: n,
                                to_id: t
                            });
                            $(".chat_message").append(e);
                            $(".chat_message div:last-child").hide().fadeIn("slow");
                            $(".chat_message").animate({
                                scrollTop: $(".chat_message").outerHeight() + 1e8
                            }, 1e3)
                        }
                    })
                }
                return false
            }
        });
        $(".logout").click(function(e) {
            var t = $(this).attr("name");
            i.emit("user_left_chat", t);
            $.ajax({
                type: "POST",
                url: name + "chat/user_logout.php",
                success: function(e) {
                    $(".chat_message").text("");
                    $(".logout").hide();
                    $(".chat_message").hide();
                    $(".chat_text_area").hide();
                    $(".chat_entry").show();
                    $(".my_user").val("");
                    $(".logout").attr("name", "")
                }
            });
            return false
        })
    })
});
*/
$(function(){
    $(".c_h").click(function(e) {
             if ($(".chat_container").is(":visible")) {
                 $(".c_h .right_c .mini").text("+")
             } else {
                 $(".c_h .right_c .mini").text("-")
             }
             $(".chat_container").slideToggle("slow");
             return false
         });
 });

// 



// family
$('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
    if (!$(this).next().hasClass('show')) {
      $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
    }
    var $subMenu = $(this).next(".dropdown-menu");
    $subMenu.toggleClass('show');
  
  
    $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
      $('.dropdown-submenu .show').removeClass("show");
    });
  
  
    return false;
  });
  $('.dropdown-menu .dropdown-menu li.nav-item.dropdown.show' ).on('click', function (event) {
    $(this).parent().toggleClass('open');
});
  
  
  function click1()
  {
     
      document.getElementById("gxapp").style.display = "block";
      document.getElementById("chat").style.display = "none";
      document.getElementById("pub").style.display = "none";
      document.getElementById("Press").style.display = "none";
      document.getElementById("soc").style.display = "none";
  }
  
function click2()
{
    document.getElementById("chat").style.display = "block";
    document.getElementById("gxapp").style.display = "none";
    document.getElementById("pub").style.display = "none";
    document.getElementById("Press").style.display = "none";
    document.getElementById("soc").style.display = "none";
   
}

function click3()
{

    document.getElementById("pub").style.display = "block";
    document.getElementById("chat").style.display = "none";
    document.getElementById("gxapp").style.display = "none";
    document.getElementById("Press").style.display = "none";
    document.getElementById("soc").style.display = "none";
   
}

function click4()
{
    document.getElementById("Press").style.display = "block";
    document.getElementById("pub").style.display = "none";
    document.getElementById("chat").style.display = "none";
    document.getElementById("gxapp").style.display = "none";
    
    document.getElementById("soc").style.display = "none";
   
}

function click5()
{   document.getElementById("soc").style.display = "block";
    document.getElementById("Press").style.display = "none";
    document.getElementById("pub").style.display = "none";
    document.getElementById("chat").style.display = "none";
    document.getElementById("gxapp").style.display = "none";
    
 
   
}
// 

document.getElementById("sa").addEventListener('click', function (event) { 
    
    event.stopPropagation(); 
});


 // Closes the menu in the event of outside click 
 window.onclick = function(event) { 
    if (!event.target.matches('.dropbutton')) { 
      
        var dropdowns =  
        document.getElementsByClassName("dropdownmenu-content"); 
          
        var i; 
        for (i = 0; i < dropdowns.length; i++) { 
            var openDropdown = dropdowns[i]; 
            if (openDropdown.classList.contains('show')) { 
                openDropdown.classList.remove('show'); 
            } 
        } 
    } 
} 