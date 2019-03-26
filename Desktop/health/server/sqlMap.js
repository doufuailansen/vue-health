/**
 * Created by apple on 2019/1/24.
 */

// sqlMap.js----SQL语句映射文件，以供api逻辑调用

var sqlMap = {
    user: {
        search: 'select * from UserInfo',
        add: 'insert into UserInfo(UserAccount, UserPassWord, UserName, UserSex, UserPhone) values (?, ?, ?, ?, ?)',
        select_name: 'select * from UserInfo where UserAccount = ',
        select_password: 'select * from UserInfo where UserPassWord = ',
        update: 'update UserInfo set ',
        get_id: 'select UserId from UserInfo',
        // 'where UserId = ?'
    },
    doctor: {
        update: 'update DoctorInfo set ',
        search: 'select * from DoctorInfo',
        search_city: 'select distinct DocCity from DoctorInfo',
        search_speciality: 'select distinct DocSepciality from DoctorInfo',
        select_city: 'select * from DoctorInfo where DocCity = ?',
        select_name: 'select * from DoctorInfo where DocAccount = ',
        select_password: 'select * from DoctorInfo where DocPassWord = ',
        add: 'insert into DoctorInfo(DocAccount, DocPassWord, DocName, DocSex, DocCareer, DocCity, DocSepciality, DocPhone, DocIntro) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    },
    article: {
        search: 'select * from ArticleInfo',
    },
    question: {
        add: 'insert into QuestionInfo(UserId, QuestionTitle, QuestionContent, QuestionTime, DocId) values (?, ?, ?, ?, ?)',
        add_answer: 'update QuestionInfo set Answer = ',
        select_all: 'select a.*,c.DocName from QuestionInfo as a, DoctorInfo as c where a.Answer is not null and a.DocId = c.DocId',
        search: 'select a.*,c.DocName from QuestionInfo as a, UserInfo as b, DoctorInfo as c where a.UserId = b.UserId and a.DocId = c.DocId and b.UserAccount = ',
        search_answer: 'select a.*,b.UserName from QuestionInfo as a, UserInfo as b, DoctorInfo as c where a.DocId = c.DocId and a.UserId = b.UserId and c.DocAccount = ',
        search_unsolved_answer: 'select a.*,b.UserName from QuestionInfo as a, UserInfo as b, DoctorInfo as c where a.DocId = c.DocId and a.UserId = b.UserId and a.Answer is null and c.DocAccount = ',
        delete: 'delete from QuestionInfo where QuestionId = '
    }
};

module.exports = sqlMap;
