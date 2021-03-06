import io from "socket.io-client";
import global from './params';
import _ from 'lodash';
const { url } = global

let socket = null;
const connectSocket = (Option = {}) => {
  if (!socket) {
    socket = io(url)
  }
  return socket;
}

export const connect = async Option => {
  await connectSocket(Option)
}

export const listen = async (type = 'message', callBack = () => { }) => {
  if (!socket) connect();
  if (!_.isString) throw Error("type must String,类型必须是字符串类型")
  socket.on(type, data => {
    callBack(data)
  });
}

export const emitSend = async (type = 'message', payload = {}) => {
  if (!socket) connect();
  if (!_.isString) throw Error("type must String,类型必须是字符串类型")
  socket.emit(type, parseMsg(
    type,
    payload
  ));
}

function parseMsg(action, payload = {}, metadata = {}) {
  const meta = Object.assign({}, {
    timestamp: Date.now(),
  }, metadata);

  return {
    meta,
    data: {
      action,
      payload,
    },
  };
}