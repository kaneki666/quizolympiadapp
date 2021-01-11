import axios from 'axios';

export const URL = 'https://server.bangabandhuolympiad.com';

export const Login_api = (user) => {
  return axios
    .post(`${URL}/login`, {
      username: user.username,
      password: user.password,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return 'Network Error';
    });
};

export const Register_Api = (data) => {
  return axios
    .post(`${URL}/register`, {
      data,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const Subject_Api = (data) => {
  return axios
    .post(`${URL}/subject`, {
      Class: data,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const Chapters_Api = (my_data) => {
  return axios
    .post(`${URL}/chapters`, {
      class: my_data.myclass,
      subject: my_data.subject,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getClassMate_Api = (myclass) => {
  return axios
    .post(`${URL}/myclassmates`, {
      myclass: myclass,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const get_stats = (username) => {
  return axios
    .post(`${URL}/userstats`, {
      username: username,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const Save_stats_api = (data) => {
  return axios
    .post(`${URL}/gamestats`, {
      data: data,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const Save_SingleStats_api = (data) => {
  return axios
    .post(`${URL}/gamestatssingle`, {
      data: data,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const Get_Leaderboard_Api = (myclass) => {
  return axios
    .post(`${URL}/leaderboard`, {myclass: myclass})
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const Get_MediaQuen_Api = () => {
  return axios
    .get(`${URL}/media`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const Get_Profile_Api = (id) => {
  return axios
    .post(`${URL}/profileinfo`, {id})
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getQuestionsSingle = (quendata) => {
  return axios
    .post(`${URL}/singleplayerquen`, {
      my_class: quendata.myclass,
      subject: quendata.subject,
      chapter: quendata.chapter,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
