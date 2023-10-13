package com.ssafy.bookwave.recommend.domain;

import com.ssafy.bookwave.recommend.enums.Type;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Recommend {

    @Id @GeneratedValue
    private Integer id;

    private String isbn;
    private Type type;

    @OneToMany(mappedBy = "recommend", fetch = FetchType.LAZY)
    private List<BbtiRecommend> bbtirecommends;

    @OneToMany(mappedBy = "recommend", fetch = FetchType.LAZY)
    private List<EmotionRecommend> emotionRecommends;


}
