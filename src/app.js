// celery valid hint usage coast try sing fit viable rubber dove coin
// nettest 0x2De010903B1F32499885dddbCe2c6469e56cDD34
// local 0x46AA75171E34bd22eCF7a5Cb04deB1f9E58310Ce
App = {
  loading: false,
  contracts: {},
  account: "0x5D5bc1b793cbB4840A8f7c3ef8db5B922Dc3d5C9",

  load: async () => {
    // load app...
    console.log("app loadding...");
    await App.loadWeb3();
    // await App.loadAccount();
    await App.loadContract();
    await App.render();
  },
  loadWeb3: async () => {
    console.log("BinanceChain", window.BinanceChain);
    if (window.BinanceChain) {
      window.web3 = new Web3(BinanceChain);
      try {
        // Request account access if needed
        await BinanceChain.enable();
        await BinanceChain.request({
          method: "eth_sign",
          params: [account, "bhai permission de de mt tadpa"],
        });
        var aa = await BinanceChain.requestAccounts();
        console.log(aa);
        // Acccounts now exposed
        // web3.BinanceChain.sendTransaction({
        //   /* ... */
        // });
      } catch (error) {
        // User denied account access...
      }
    } else if (window.web3) {
      console.log("web3.currentProvider");
      console.log(web3.currentProvider);

      App.web3Provider = web3.currentProvider;
      window.web3 = new Web3(web3.currentProvider);
      web3.currentProvider.request({
        method: "eth_sign",
        params: [
          "0x46AA75171E34bd22eCF7a5Cb04deB1f9E58310Ce",
          "bhai permission de de mt tadpa",
        ],
      });
      console.log(web3);
      //   web3.eth.request({method: "eth_sign", params: ["address", "message"]});
    }
    // Non-dapp browsers...
    else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  },

  //   loadAccount: async () => {
  //     // Set the current blockchain account

  //     App.account = web3.BinanceChain.accounts[0];
  //     console.log("account", App.account);
  //   },

  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const studentResult = await $.getJSON("StudentResult.json");
    App.contracts.StudentResult = TruffleContract(studentResult);
    App.contracts.StudentResult.setProvider(BinanceChain);

    // Hydrate the smart contract with values from the blockchain
    App.StudentResult = await App.contracts.StudentResult.deployed();
    console.log(App.StudentResult);
  },

  render: async () => {
    // Prevent double render
    if (App.loading) {
      return;
    }

    // Update app loading state
    App.setLoading(true);

    // Render Account
    $("#account").html(App.account);

    // Render Tasks
    await App.renderTasks();

    // Update loading state
    App.setLoading(false);
  },

  renderTasks: async () => {
    // Load the total task count from the blockchain
    const studentCount = await App.StudentResult.studentCount();
    console.log("studentCount");
    console.log(studentCount.length);
    console.log("studentCount");

    const $taskTemplate = $(".taskTemplate");
    const studentsData = [];
    var html = ``;

    // Render out each task with a new task template
    for (var i = 1; i <= studentCount.length; i++) {
      // Fetch the task data from the blockchain
      const task = await App.StudentResult.students(i);
      const studentJson = {
        studentId: task[0].toNumber(),
        studentName: task[1],
        subject1Name: task[2],
        subject1Marks: task[3].toNumber(),

        subject2Name: task[4],
        subject2Marks: task[5].toNumber(),

        subject3Name: task[6],
        subject3Marks: task[7].toNumber(),

        subject4Name: task[8],
        subject4Marks: task[9].toNumber(),

        subject5Name: task[10],
        subject5Marks: task[11].toNumber(),
      };
      const totalMarks =
        studentJson.subject1Marks +
        studentJson.subject2Marks +
        studentJson.subject3Marks +
        studentJson.subject4Marks +
        studentJson.subject5Marks;
      html =
        html +
        `
      <tr>
        <th scope="row">` +
        studentJson.studentId +
        `</th>
        <td>` +
        studentJson.studentName +
        `</td>
        <td>` +
        studentJson.subject1Name +
        `=` +
        studentJson.subject1Marks +
        `</td>
        <td>` +
        studentJson.subject2Name +
        `=` +
        studentJson.subject2Marks +
        `</td>
        <td>` +
        studentJson.subject3Name +
        `=` +
        studentJson.subject3Marks +
        `</td>
        <td>` +
        studentJson.subject4Name +
        `=` +
        studentJson.subject4Marks +
        `</td>
        <td>` +
        studentJson.subject5Name +
        `=` +
        studentJson.subject5Marks +
        `</td>
        <td>` +
        totalMarks +
        `</td>
      </tr>
      `;
      studentsData.push(studentJson);
    }
    $("#tableBody").html(html);
  },

  createStudent: async () => {
    App.setLoading(true);
    const studentName = $("#studentName").val();
    const subject1Name = $("#subject1Name").val();
    const subject1Mark = $("#subject1Mark").val();
    const subject2Name = $("#subject2Name").val();
    const subject2Mark = $("#subject2Mark").val();
    const subject3Name = $("#subject3Name").val();
    const subject3Mark = $("#subject3Mark").val();
    const subject4Name = $("#subject4Name").val();
    const subject4Mark = $("#subject4Mark").val();
    const subject5Name = $("#subject5Name").val();
    const subject5Mark = $("#subject5Mark").val();
    await App.todoList.createTask(
      studentName,
      subject1Name,
      subject1Mark,
      subject2Name,
      subject2Mark,
      subject3Name,
      subject3Mark,
      subject4Name,
      subject4Mark,
      subject5Name,
      subject5Mark
    );
    window.location.reload();
  },

  setLoading: (boolean) => {
    App.loading = boolean;
    const loader = $("#loader");
    const content = $("#content");
    if (boolean) {
      loader.show();
      content.hide();
    } else {
      loader.hide();
      content.show();
    }
  },
};

$(() => {
  $(window).load(() => {
    App.load();
  });
});
