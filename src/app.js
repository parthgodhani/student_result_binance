// celery valid hint usage coast try sing fit viable rubber dove coin
// nettest 0x2De010903B1F32499885dddbCe2c6469e56cDD34
// local 0x46AA75171E34bd22eCF7a5Cb04deB1f9E58310Ce
App = {
  loading: false,
  contracts: {},
  account: "0x2De010903B1F32499885dddbCe2c6469e56cDD34",
  
  load: async () => {
    // load app...
    console.log("app loadding...");
    await App.loadWeb3();
    // await App.loadAccount();
    await App.loadContract()
    await App.render()
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
          params: [
            account,
            "bhai permission de de mt tadpa",
          ],
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
    const studentResult = await $.getJSON('StudentResult.json')
    App.contracts.StudentResult = TruffleContract(studentResult)
    App.contracts.StudentResult.setProvider(BinanceChain)

    // Hydrate the smart contract with values from the blockchain
    App.StudentResult = await App.contracts.StudentResult.deployed()
    console.log(App.StudentResult);
  },

  render: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }

    // Update app loading state
    App.setLoading(true)

    // Render Account
    $('#account').html(App.account)

    // Render Tasks
    await App.renderTasks()

    // Update loading state
    App.setLoading(false)
  },

  renderTasks: async () => {
    // Load the total task count from the blockchain
    const studentCount = await App.StudentResult.studentCount()
    console.log("studentCount");
    console.log(studentCount);
    console.log("studentCount");

    const $taskTemplate = $('.taskTemplate')

    // Render out each task with a new task template
    for (var i = 1; i <= studentCount; i++) {
      // Fetch the task data from the blockchain
      const task = await App.StudentResult.tasks(i)
      const taskId = task[0].toNumber()
      const taskContent = task[1]
      const taskCompleted = task[2]

      // Create the html for the task
      const $newTaskTemplate = $taskTemplate.clone()
      $newTaskTemplate.find('.content').html(taskContent)
      $newTaskTemplate.find('input')
                      .prop('name', taskId)
                      .prop('checked', taskCompleted)
                      .on('click', App.toggleCompleted)

      // Put the task in the correct list
      if (taskCompleted) {
        $('#completedTaskList').append($newTaskTemplate)
      } else {
        $('#taskList').append($newTaskTemplate)
      }

      // Show the task
      $newTaskTemplate.show()
    }
  },

  setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  }
};

$(() => {
    $(window).load(() => {
      App.load()
    })
  })
