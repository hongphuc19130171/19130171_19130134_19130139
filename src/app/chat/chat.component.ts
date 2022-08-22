import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AdapterService} from "../services/adapter.service";
import {Command} from "../model/command";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  reactiveForm!: FormGroup;
  nameRoom: any;
  listUser: any;
  chatData: any;
  reverseList: any;
  index = 0;
  dataRoom: any;
  type: any;
  contactName!: string;
  username = localStorage.getItem('username') as string;
  toUser!: string;

  code = localStorage.getItem('code') as string;

  constructor(private builder: FormBuilder, private cmdService: AdapterService, private router: Router, listUser: AdapterService) {
    cmdService.sbj.subscribe(data => {
      console.warn(data)
    })
  }

  ngOnInit(): void {
    this.clearReloginCode();
    this.getListUser();
    this.checkLogin();

    this.reactiveForm = this.builder.group({
      input_message: [null, Validators.required],
      search: [null, Validators.required]
    });

  }

  get reactiveFormControl() {
    return this.reactiveForm.controls;
  }

  clearReloginCode() {
    setTimeout(() => {
      localStorage.clear();
    }, 60000)
  };

  getListUser(): void {
    let reponse: Command = {
      "action": "onchat",
      "data": {
        "event": "GET_USER_LIST"
      }
    };
    this.cmdService.sbj.next(reponse);
    this.cmdService.sbj.subscribe((msg) => {
      if (msg['status'] == 'success') {
        this.listUser = (msg['data']);
      }
    });
  }

  logout(): void {
    let request: Command = {
      "action": "onchat",
      "data": {
        "event": "LOGOUT"
      }
    }
    this.cmdService.sbj.next(request);
    this.cmdService.sbj.subscribe((msg) => {
      if (msg['status'] == 'success') {
        console.log('success')
        this.router.navigate(['/signin']);
      }
    })
  }


  public checkUser() {
    this.cmdService.sbj.next({
      "action": "onchat",
      "data": {
        "event": "CHECK_USER",
        "data": {
          "user": this.reactiveForm.value.search
        }
      }
    });
    this.cmdService.sbj.subscribe((msg) => {
      let data = msg['data'] as Command;
      let date = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US');
      if (data['status'] == false && !this.isContain(this.reactiveForm.value.search, this.listUser))
        this.listUser.unshift({
          "name": this.reactiveForm.value.search,
          "type": 0,
          "actionTime": date
        });
      this.reactiveForm.patchValue({search: ""});
    });
  }

  private isContain(username: string, list: any[]): boolean {
    for (let i = 0; i < list.length; i++) {
      if (list[i]['name'] == username)
        return true;
    }
    return false;
  }

  createRoom(): void {
    let request: Command = {
      "action": "onchat",
      "data": {
        "event": "CREATE_ROOM",
        "data": {
          "name": this.reactiveForm.value.search
        }
      }
    };
    this.cmdService.sbj.next(request);
    this.cmdService.sbj.subscribe((msg) => {
      this.reactiveForm.patchValue({search: ""});
      if (msg['status'] == 'success') {
        this.getListUser();
      } else
        alert('Create room failed, Room Exist')
    })
  }

  getChat(typeUser: string, name: string): void {
    if (typeUser == "1") {
      this.getRoomChatMess(name);
    } else {
      this.getPeopleChatMess(name);
    }
  }

  getRoomChatMess(room: string): void {
    let request: Command = {
      "action": "onchat",
      "data": {
        "event": "GET_ROOM_CHAT_MES",
        "data": {
          "name": room,
          "page": "1"
        }
      }
    };
    this.cmdService.sbj.next(request);
    this.cmdService.sbj.subscribe((msg) => {
      if (msg['status'] == 'success') {
        this.dataRoom = (msg['data']);
        let chatData = msg['data'] as Command;
        this.chatData = (chatData['chatData']);
        this.reverseList = this.chatData.slice().reverse();
        this.contactName = room;
        this.getListUser();
        this.type = 1;
      }
    })
  }


  getPeopleChatMess(user: string): void {
    let request: Command = {
      "action": "onchat",
      "data": {
        "event": "GET_PEOPLE_CHAT_MES",
        "data": {
          "name": user,
          "page": "1"
        }
      }
    };
    this.cmdService.sbj.next(request);
    this.cmdService.sbj.subscribe((msg) => {
      if (msg['status'] == 'success') {
        this.chatData = (msg['data']);
        this.reverseList = this.chatData.slice().reverse();
        this.contactName = user;
        if (this.chatData.length != 0) {
          this.getListUser();
        }
         this.type = 0;
      }
    })
  }

  chat(): void {
    if (this.type == 1) {
      this.chatRoom();
    } else {
      this.chatPeople();
    }
  }

  chatRoom(): void {
    let request: Command = {
      "action": "onchat",
      "data": {
        "event": "SEND_CHAT",
        "data": {
          "type": 'room',
          "to": this.dataRoom.name,
          "mes": this.reactiveForm.value.input_message
        }
      }
    };
    this.cmdService.sbj.next(request);
    this.reactiveForm.patchValue({input_message: ""});
    this.getRoomChatMess(this.dataRoom.name);
  }

  chatPeople(): void {
    let request: Command = {
      "action": "onchat",
      "data": {
        "event": "SEND_CHAT",
        "data": {
          "type": 'people',
          "to": this.contactName,
          "mes": this.reactiveForm.value.input_message
        }
      }
    };
    this.cmdService.sbj.next(request);
    console.log(request)
    this.reactiveForm.patchValue({input_message: ""});
    this.getPeopleChatMess(this.contactName);
  }

  joinRoom(): void {
    let request: Command = {
      "action": "onchat",
      "data": {
        "event": "JOIN_ROOM",
        "data": {
          "name": this.reactiveForm.value.search
        }
      }
    };
    this.cmdService.sbj.next(request);
    this.cmdService.sbj.subscribe((msg) => {
      if (msg['status'] == 'success') {
        this.reactiveForm.patchValue({search: ""});
        this.dataRoom = (msg['data']);
        let data = msg['data'] as Command;
        this.nameRoom = (data['name']);
        this.getRoomChatMess(this.nameRoom);
      } else {
        alert('Room not found');
      }
    })
  }

  checkLogin() {
    if (this.username == null) {
      this.router.navigate(['/login']);
    }
  }

  reLogin(): void {
    let request: Command = {
      "action": "onchat",
      "data": {
        "event": "RE_LOGIN",
        "data": {
          "user": this.username,
          "code": this.code
        }
      }
    };
    this.cmdService.sbj.next(request);
    this.cmdService.sbj.subscribe((msg) => {
      if (msg['status'] == 'success') {
        this.router.navigate(['/chat']);
        let data = msg['data'] as Command;
        localStorage.setItem('code', data['RE_LOGIN_CODE'] as string);
      }
    });
  }
}
