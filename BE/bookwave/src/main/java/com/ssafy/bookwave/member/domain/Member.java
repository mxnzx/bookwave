package com.ssafy.bookwave.member.domain;

import com.ssafy.bookwave.bbti.domain.BbtiType;
import com.ssafy.bookwave.book.domain.BookshelfBook;
import com.ssafy.bookwave.book.domain.Click;
import com.ssafy.bookwave.global.domain.BaseTimeEntity;
import com.ssafy.bookwave.member.dto.FileDto;
import com.ssafy.bookwave.member.dto.request.MemberInfoUpdateRequestDto;
import com.ssafy.bookwave.member.enums.Gender;
import com.ssafy.bookwave.member.enums.Role;
import com.ssafy.bookwave.member.enums.SocialType;
import com.ssafy.bookwave.record.domain.Comment;
import com.ssafy.bookwave.record.domain.RecordLike;
import com.ssafy.bookwave.record.domain.Record;
import com.ssafy.bookwave.reminder.domain.Reminder;

import java.util.List;
import javax.persistence.*;

import lombok.*;

@Getter
@Entity
@NoArgsConstructor
@ToString
public class Member extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bbti_type_id")
    private BbtiType bbtiType;

    private String email;
    private String nickname;

    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String profileImgName;
    private String profileImgPath;
    private String socialId;

    @Enumerated(EnumType.STRING)
    private SocialType socialType;
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "member" ,fetch = FetchType.LAZY)
    private List<Attendance> attendance;

    @OneToMany(mappedBy = "follower", fetch = FetchType.LAZY)
    private List<Follow> followers;

    @OneToMany(mappedBy = "following", fetch = FetchType.LAZY)
    private List<Follow> followings;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<BookshelfBook> bookshelfBooks;

    @OneToOne(mappedBy = "member", fetch = FetchType.LAZY)
    private Click click;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Record> records;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<RecordLike> recordLikes;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Comment> comments;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Reminder> reminders;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<MemberGenre> memberGenres;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<MemberBookScore> memberBookScores;


    public Member(Integer id) {
        super();
        this.id = id;
    }
    @Builder
    public Member(String email, BbtiType bbtiType, String nickname, Gender gender, String profileImgName, String profileImgPath, String socialId, SocialType socialType, Role role) {
        this.email = email;
        this.bbtiType = bbtiType;
        this.nickname = nickname;
        this.gender = gender;
        this.profileImgName = profileImgName;
        this.profileImgPath = profileImgPath;
        this.socialId = socialId;
        this.socialType = socialType;
        this.role = role;
    }

    //회원정보 수정
    public void updateMemberInfo(MemberInfoUpdateRequestDto mypageUpdateRequestDto, FileDto fileDto) {
        this.nickname = mypageUpdateRequestDto.getNickname();
        this.profileImgName = fileDto.getFileOriginalName();
        this.profileImgPath = fileDto.getFilePath();
    }
    public void updateMemberInfo(MemberInfoUpdateRequestDto mypageUpdateRequestDto) {
        this.nickname = mypageUpdateRequestDto.getNickname();
    }
    public void updateMemberInfo(FileDto fileDto) {
        this.profileImgName = fileDto.getFileOriginalName();
        this.profileImgPath = fileDto.getFilePath();
    }

    //닉네임 수정
    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    // 회원탈퇴
    public void updateRole(Role role){
        this.role = role;
    }

    //bbti 유형 수정
    public void updateBbti(BbtiType bbtiType ){
        this.bbtiType = bbtiType;
    }

}
