package com.ssafy.bookwave.member.service;

import com.ssafy.bookwave.book.domain.GenreDict;
import com.ssafy.bookwave.book.dto.response.GenreDictResponseDto;
import com.ssafy.bookwave.global.exception.validator.MemberValidator;
import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.member.domain.MemberGenre;
import com.ssafy.bookwave.member.dto.response.FavoriteGenreResponseDto;
import com.ssafy.bookwave.member.dto.response.GenreQuestionResponseDto;
import com.ssafy.bookwave.member.repository.GenreRepository;
import com.ssafy.bookwave.member.repository.MemberGenreRepository;
import com.ssafy.bookwave.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class GenreServiceImpl implements GenreService {

    private final GenreRepository genreRepository;
    private final MemberRepository memberRepository;
    private final MemberValidator memberValidator;
    private final MemberGenreRepository memberGenreRepository;

    @Override
    public GenreQuestionResponseDto getGenreList(int memberId) {
        Member member = getMember(memberId);
        List<GenreDict> allGenre = genreRepository.findAll();

        List<GenreDictResponseDto> genreDictResponseDtos = allGenre.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

        return new GenreQuestionResponseDto(genreDictResponseDtos);
    }

    private GenreDictResponseDto convertToDto(GenreDict genreDict) {
        return new GenreDictResponseDto(genreDict.getId(), genreDict.getName());
    }

    @Override
    public void registGenre(int memberId, List<Integer> genreList) {
        Member member = getMember(memberId);

        List<MemberGenre> getmemberGenre = memberGenreRepository.findByMemberId(member.getId());

        if(!getmemberGenre.isEmpty()) {
            // 장르가 이미 있으면 업데이트 하기
            updateGenre(memberId, genreList);
            return;
        }



        for (Integer genreId : genreList) {
            Optional<GenreDict> genreDict = genreRepository.findById(genreId);

            if (genreDict.isPresent()) {
                GenreDict getGenreDict = genreDict.get();

                MemberGenre memberGenre = MemberGenre.builder()
                        .member(member)
                        .genreDict(getGenreDict)
                        .build();

                memberGenreRepository.save(memberGenre);

            } else {
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "해당하는 장르를 찾을 수 없습니다. " + genreId
                );
            }
        }
    }

    // 장르 업데이트
    public void updateGenre(int memberId, List<Integer> newGenreList) {
        Member member = getMember(memberId);

        List<MemberGenre> existingMemberGenres = memberGenreRepository.findByMemberId(member.getId());

        // 로그인 된 멤버의 장르 불러오기
        List<Integer> existingGenreIds = existingMemberGenres.stream()
                .map(memberGenre -> memberGenre.getGenreDict().getId())
                .collect(Collectors.toList());

        // 삭제해야하는 장르
        List<MemberGenre> genresToDelete = existingMemberGenres.stream()
                .filter(memberGenre -> !newGenreList.contains(memberGenre.getGenreDict().getId()))
                .collect(Collectors.toList());

        // 새로 추가해야하는 장르
        List<Integer> genresToAdd = newGenreList.stream()
                .filter(genreId -> !existingGenreIds.contains(genreId))
                .collect(Collectors.toList());

        // 장르 삭제
        memberGenreRepository.deleteAll(genresToDelete);

        // 새로운 장르를 추가
        for (Integer genreId : genresToAdd) {
            Optional<GenreDict> genreDict = genreRepository.findById(genreId);

            if (genreDict.isPresent()) {
                GenreDict getGenreDict = genreDict.get();

                MemberGenre memberGenre = MemberGenre.builder()
                        .member(member)
                        .genreDict(getGenreDict)
                        .build();

                memberGenreRepository.save(memberGenre);
            } else {
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "해당하는 장르를 찾을 수 없습니다. " + genreId
                );
            }
        }
    }


    @Override
    public FavoriteGenreResponseDto getFavoriteGenreList(Member member) {

        //member id로 선호하는 genre 찾기
        List<GenreDictResponseDto> genreDictResponseDtos = memberGenreRepository.findByMember(member)
                .stream()
                .map(this::convertToGenreDictResponse)
                .collect(Collectors.toList());

        return new FavoriteGenreResponseDto(genreDictResponseDtos);
    }


    private GenreDictResponseDto convertToGenreDictResponse(MemberGenre memberGenre) {
        return GenreDictResponseDto.builder()
                .id(memberGenre.getGenreDict().getId())
                .name(memberGenre.getGenreDict().getName())
                .build();
    }


    private Member getMember(int memberId) {
        Optional<Member> member = memberRepository.findById(memberId);
        memberValidator.checkMember(member, memberId);
        return member.get();
    }
}